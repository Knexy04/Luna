import SaleSchema from "../models/sale.js";
import ItemSchema from "../models/item.js";
import SelectionSchema from "../models/selection.js";

const errorMSG = "Произошла ошибка!";

export default class saleController {
  static createSale = async (req, res) => {
    try {
      const check = await SaleSchema.find({ name: req.body.name });

      if (check.length > 0) {
        return res.status(400).json({ error: "Акция уже существует" });
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
        subtitle: req.body.subtitle,
        start: req.body.start,
        end: req.body.end,
        items: req.body.items,
        photo: req.body.photo,
        disabled: req.body.disabled
      };

      const sale = await new SaleSchema(fields);

      await sale.save();

      res.json(sale);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static getSale = async (req, res) => {
    try {
      const sale = await SaleSchema.findById(req.query._id).populate({
        path: "items",
        populate: {
          path: "category",
        },
      });
      res.status(200).json(sale);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({
          error: e,
          message: "Произошла ошибка при получении данных о продаже",
        });
    }
  };

  static getSales = async (req, res) => {
    try {
      const sales = await SaleSchema.find().populate("items");
      res.status(200).json(sales);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static addItemToSale = async (req, res) => {
    try {
      const check = await SaleSchema.findById(req.body._id);

      if (!check) {
        return res.status(400).json({ message: "Акции не существует" });
      }

      const checkItem = await ItemSchema.findById(req.body.item);

      if (!checkItem) {
        res.status(404).json({ message: "Товар не найден" });
      }

      const saleUpdated = await SaleSchema.findByIdAndUpdate(
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

  static removeItemFromSale = async (req, res) => {
    try {
      const check = await SaleSchema.findById(req.query._id);

      if (!check) {
        return res.status(400).json({ message: "Акции не существует" });
      }

      const checkItem = await ItemSchema.findById(req.query.item);

      if (!checkItem) {
        res.status(404).json({ message: "Товар не найден" });
      }

      const saleUpdated = await SaleSchema.findByIdAndUpdate(
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

  static updateSale = async (req, res) => {
    try {
      const saleId = req.params.id;
      const sale = await SaleSchema.findById(saleId);

      if (!sale) {
        return res.status(404).json({ error: "Акция не найдена" });
      }

      if (req.body.name && req.body.name !== sale.name) {
        const check = await SaleSchema.find({ name: req.body.name });
        if (check.length > 0) {
          return res
            .status(400)
            .json({ error: "Акция с таким именем уже существует" });
        }
      }

      const fields = {
        name: req.body.name || sale.name,
        subtitle: req.body.subtitle || sale.subtitle,
        start: req.body.start || sale.start,
        end: req.body.end || sale.end,
        photo: req.body.photo || sale.photo,
        disabled: req.body.disabled,
      };

      const updatedSale = await SaleSchema.findByIdAndUpdate(saleId, fields, {
        new: true,
        runValidators: true,
      });

      res.json(updatedSale);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  };
}
