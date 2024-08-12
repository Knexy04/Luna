import SubCategorySchema from "../models/subCategory.js";
import ItemSchema from "../models/item.js";
import TagSchema from "../models/tag.js";
import CategorySchema from "../models/category.js";
import BrandSchema from "../models/brand.js";

const errorMSG = "Произошла ошибка!";

export default class itemController {
  static getItemsCategory = async (req, res) => {
    try {
      const categoryItems = await CategorySchema.findOne({
        engName: req.query.category,
      }).populate({
        path: "subcategories",
        populate: {
          path: "items",
          populate: {
            path: "category",
            select: "name engName",
          },
        },
      });

      if (!categoryItems) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json(categoryItems);
    } catch (e) {
      console.error("Error fetching category items:", e);
      res.status(500).json({
        error: e.message,
        message: "An error occurred while fetching the category items",
      });
    }
  };

  static createItem = async (req, res) => {
    try {
      // const imagesUrlsResponse = await axios.post('/upload', req.files);
      // const imagesUrls = imagesUrlsResponse.data;

      const category = await SubCategorySchema.findById(req.body.category);
      if (!category) {
          return res.status(404).json({ message: "Категория не найдена!" });
      }

      // Проверка тегов и бренда...

      const fields = {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          tags: req.body.tags,
          photos: req.body.photos,
          price: req.body.price.split(','),
          stock: req.body.stock,
          sold: req.body.sold,
          brand: req.body.brand
      };

      const data = await new ItemSchema(fields);
      await data.save();

      await SubCategorySchema.findByIdAndUpdate(req.body.category, { $push: { items: data._id } });

      res.status(200).json(data);
  } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: "Ошибка при создании элемента" });
  }
  }

  static getItem = async (req, res) => {
    try {
      if (req.query.category) {
        const categoryItems = await CategorySchema.findOne({
          engName: req.query.category,
        }).populate({
          path: "subcategories",
          populate: {
            path: "items",
            populate: "category",
          },
        });

        return res.status(200).json(categoryItems);
      }

      const item = await ItemSchema.findById(req.query._id)
        .populate({ path: "category", select: "name _id" })
        .populate("tags")
        .populate({
          path: "reviews",
          populate: {
            path: "user", // Путь к полю user в модели Review
          },
        })
        .populate("brand");

      if (!item) {
        const items = await ItemSchema.find().populate({
          path: "category",
          select: "name _id",
        });
        return res.json(items);
      }

      res.status(200).json(item);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static getBrands = async (req, res) => {
    try {
      if (req.query.brand) {
        const items = await ItemSchema.find()
          .populate({
            path: "category",
            select: "name _id",
          })
          .populate("tags")
          .populate("reviews")
          .populate({
            path: "brand",
            match: { name: req.query.brand },
          });

        const filteredItems = items.filter((item) => item.brand != null);

        return res.status(200).json(filteredItems);
      }

      const brands = await BrandSchema.find();

      res.status(200).json(brands);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: "Internal Server Error" });
    }
  };

  static getNew = async (req, res) => {
    try {
      const items = await ItemSchema.find()
        .populate({
          path: "category",
          select: "name _id",
        })
        .sort({ createdAt: -1 })
        .limit(100);
      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static topSellers = async (req, res) => {
    try {
      const items = await ItemSchema.find()
        .sort({ sold: -1 })
        .limit(100)
        .populate({
          path: "category",
          select: "name _id",
        });

      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static deleteItem = async (req, res) => {
    try {
      const check = await ItemSchema.findById(req.query._id);

      if (!check) {
        return res.status(404).json({ message: "Товар не найден!" });
      }

      const item = await ItemSchema.findByIdAndUpdate(req.query._id, {
        disabled: true,
      });

      res.json({ message: "Товар удалён", item: item });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static enableItem = async (req, res) => {
    try {
      const check = await ItemSchema.findById(req.query._id);

      if (!check) {
        return res.status(404).json({ message: "Товар не найден!" });
      }

      const item = await ItemSchema.findByIdAndUpdate(req.query._id, {
        disabled: false,
      });

      res.json({ message: "Товар восстановлен", item: item });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static updateStock = async (req, res) => {
    try {
      const item = await ItemSchema.findByIdAndUpdate(
        req.query._id,
        { stock: req.body.stock },
        { new: true }
      );

      res.status(200).json(item);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static updateItem = async (req, res) => {
    try {
      const { id } = req.query; // Assuming the item ID is provided as a URL parameter
      const updatedData = req.body; // All updated fields are provided in the request body
      console.log(id)
      const item = await ItemSchema.findByIdAndUpdate(id, updatedData, { new: true });
  
      res.status(200).json(item);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e, message: 'Failed to update item' });
    }
  };

  static getItemsSale = async (req, res) => {
    try {
      const items = await ItemSchema.find({
        $expr: { $gt: [{ $size: "$price" }, 1] },
      })
        .populate({ path: "category", select: "name _id" })
        .populate("tags")
        .populate("reviews")
        .populate("brand");

      return res.json(items);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: e, message: "An error occurred while fetching items." });
    }
  };

  static updatePrice = async (req, res) => {
    try {
      const item = await ItemSchema.findByIdAndUpdate(
        req.query._id,
        { $push: { price: req.body.price }, sale: req.body.sale },
        { new: true }
      );

      return res.status(200).json(item);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static async #getShowcase(req, res, type) {
    try {
      const items = await ItemSchema.find()
        .sort(
          type === "new" || type === "newfull" ? { createdAt: -1 } : type === "top" && { sold: -1 }
        )
        .limit(type === "newfull" ? 45 : 8)
        .populate({
          path: "category",
          select: "name _id",
        });
      return res.status(200).json(items);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  }

  static newShowcase = async (req, res) => {
    await this.#getShowcase(req, res, "new");
  };

  static newShowcasefull = async (req, res) => {
    await this.#getShowcase(req, res, "newfull");
  };
  
  static topShowcase = async (req, res) => {
    await this.#getShowcase(req, res, "top");
  };
}
