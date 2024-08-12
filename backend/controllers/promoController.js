import PromoSchema from "../models/promo.js";

const errorMSG = "Произошла ошибка!";

export default class promoController {
  static usePromo = async (req, res) => {
    try {
      const promo = await PromoSchema.findOne({ code: req.query.code });
      if (!promo) {
        return res
          .status(404)
          .json({ message: "Данного промокода не существует!" });
      }
      if (promo.acitve === false) {
        return res.status(400).json({ message: "Промокод уже недоступен!" });
      }

      if (req.query.price < promo.min) {
        return res
          .status(400)
          .json({ message: `Сумма заказа должна быть не менее ${promo.min}` });
      }

      res
        .status(200)
        .json({ message: "Промокод успешно применен!", sale: promo.sale });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static createPromo = async (req, res) => {
    try {
      const check = await PromoSchema.findOne({ code: req.body.code });
      if (check) {
        return res
          .status(400)
          .json({ message: "Данный промокод уже существует!" });
      }
      const promo = await new PromoSchema({
        code: req.body.code,
        active: true,
        sale: req.body.sale,
        min: req.body.min,
      });
      await promo.save();
      return res.status(200).json(promo);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static updateActive = async (req, res) => {
    try {
      const promo = await PromoSchema.findOne({ code: req.query.code });
      if (!promo) {
        return res
          .status(404)
          .json({ message: "Данного промокода не существует!" });
      }
      promo.active = false
      await promo.save()
      return res.status(200).json(promo);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: errorMSG });
    }
  };
}
