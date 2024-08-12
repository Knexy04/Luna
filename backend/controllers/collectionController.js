import SaleSchema from "../models/sale.js";
import ItemSchema from "../models/item.js";
import CollectionShema from "../models/collection.js";

const errorMSG = "Произошла ошибка!";

export default class collectionController {

  static createCollection = async (req, res) => {
    try {
      const check = await CollectionShema.find({ name: req.body.name });

      if (check.length > 0) {
        return res.status(400).json({ error: "Коллекция уже существует" });
      }

      if (req.body.items?.length > 0) {
        req.body.items.map(async (id) => {
          const item = await ItemSchema.findById(id);
          if (!item) {
            return res.status(400).json({ error: "Товара не существует" });
          }
        });
      }

      const fields = {
        name: req.body.name,
        items: req.body.items,
        disabled: req.body.disabled,
        photo: req.body.photos[0]
      };

      const collection = await new CollectionShema(fields);

      await collection.save();

      res.json(collection);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };
  
  static getCollection = async (req, res) => {
    try {
        const collection = await CollectionShema.findById(req.query._id).populate({
            path: "items",
            populate: {
                path: "category"
            }
        });
        res.status(200).json(collection);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e, message: "Произошла ошибка при получении данных о продаже" });
    }
};

  static getCollections = async (req, res) => {
    try {
      const collection = await CollectionShema.find().populate("items");
      res.status(200).json(collection)
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static addItemToCollettion = async (req, res) => {
    try {
      const check = await CollectionShema.findById(req.body._id);

      if (!check) {
        return res.status(400).json({ message: "Акции не существует" });
      }

      const checkItem = await ItemSchema.findById(req.body.item);

      if (!checkItem) {
        res.status(404).json({ message: "Товар не найден" });
      }

      const saleUpdated = await CollectionShema.findByIdAndUpdate(
        req.body._id,
        { $push: { items: req.body.item } },
        { new: true }
      );

      return res.status(200).json(saleUpdated);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static removeItemFromCollection = async (req, res) => {
    try {
      const check = await CollectionShema.findById(req.query._id);

      if (!check) {
        return res.status(400).json({ message: "Акции не существует" });
      }

      const checkItem = await ItemSchema.findById(req.query.item);

      if (!checkItem) {
        res.status(404).json({ message: "Товар не найден" });
      }

      const saleUpdated = await CollectionShema.findByIdAndUpdate(
        req.query._id,
        { $pull: { items: req.query.item } },
        { new: true }
      );

      return res.status(200).json(saleUpdated);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };


  static updateCollection = async (req, res) => {
    const { id } = req.params;
    const { name, disabled } = req.body;
    const photo = req.body.photo;

    try {
      let updatedCollection = await CollectionShema.findOne({ _id: id });
  
      if (!updatedCollection) {
        return res.status(404).json({ message: "Collection not found" });
      }
  
      // Обновление полей
      if (name) {
        updatedCollection.name = name;
      }
      if (photo) {
        updatedCollection.photo = photo;
      }
      if (disabled !== undefined) {
        updatedCollection.disabled = disabled;
      }
  
      // Сохранение обновленного объекта
      updatedCollection = await updatedCollection.save();
  
      res.status(200).json(updatedCollection);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: "An error occurred while updating the collection" });
    }
  };
  
}
  
