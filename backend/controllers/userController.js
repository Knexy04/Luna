import UserSchema from "../models/user.js";
import PhoneCodes from "../models/phoneCodes.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ItemSchema from "../models/item.js";
import OrderSchema from "../models/order.js";
import OrderStatusSchema from "../models/orderStatus.js";
import SubCategorySchema from "../models/subCategory.js";
import TagSchema from "../models/tag.js";
import { phoneFilter } from "../utils/phoneFilter.js";

const errorMSG = "Произошла ошибка!";

export default class userController {
  static createUser = async (req, res) => {
    try { 
      const phoneNumber = phoneFilter(req.body.phoneNumber);
      const isPhoneValid = await UserSchema.findOne({
        phoneNumber: phoneNumber,
      });
      const phoneCode = await PhoneCodes.findOne({ phoneNumber: phoneNumber });

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      if (isPhoneValid) {
        return res.status(400).json({ message: "Номер телефона занят" });
      }

      if (phoneCode.randomCode !== req.body.phoneCode) {
        return res.status(400).json({ message: "Код введён неверно!" });
      }

      const fields = {
        firstName: req.body.name,
        phoneNumber: phoneNumber,
        passwordHash: hash,
      };

      const user = await new UserSchema(fields);

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "30d",
        }
      );

      await user.save();

      res.status(200).json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static reloadPass = async (req, res) => {
    try { 
      const phoneNumber = phoneFilter(req.body.phoneNumber);
      
      const phoneCode = await PhoneCodes.findOne({ phoneNumber: phoneNumber });

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      if (phoneCode.randomCode !== req.body.phoneCode) {
        return res.status(400).json({ message: "Код введён неверно!" });
      }

      const user = await UserSchema.findOne({phoneNumber: phoneNumber});

      user.passwordHash = hash

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "30d",
        }
      );

      await user.save();

      res.status(200).json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static checkPhoneReload = async (req, res) => {
    try {
      const phoneNumber = phoneFilter(req.body.phone);

      const isPhoneValid = await UserSchema.findOne({
        phoneNumber: phoneNumber,
      });

      if (!isPhoneValid) {
        return res.status(400).json({ message: "Нет аккаунта с таким номером!" });
      }

      const now = new Date();
      const oneMinuteAgo = new Date(now - 120 * 1000);
      const url = process.env.PHONE_CHECK_URL;
      const apiKey = process.env.PHONE_CHECK_API_KEY;
      const isJSON = 1;
      const recipients = phoneNumber;

      function generateRandomCode() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const randomCode = await generateRandomCode();

      const data = new URLSearchParams();
      data.append("api_id", apiKey);
      data.append("to", '+7' + recipients);
      data.append("msg", randomCode);
      data.append("json", isJSON);

      const checkCode = await PhoneCodes.findOne({ phoneNumber: recipients });

      if (checkCode) {
        if (checkCode.updatedAt > oneMinuteAgo) {
          return res.status(400).json({ message: "Код уже был отправлен" });
        }
      }
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data)
          if (!data.sms.undefined) {
            if (checkCode) {
              await checkCode.updateOne({ randomCode: randomCode });
              res.status(200).json({ data, checkCode });
            } else {
              const phoneData = await new PhoneCodes({
                phoneNumber: recipients,
                randomCode: randomCode,
              });
              await phoneData.save();
              res.status(200).json({ data, phoneData });
            }
          } else {
            res
              .status(404)
              .json({ error: data, message: data.sms.undefined.status_text });
          }
        })
        .catch((error) => res.status(500).json(error));
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static checkPhone = async (req, res) => {
    try {
      const phoneNumber = phoneFilter(req.body.phone);

      const now = new Date();
      const oneMinuteAgo = new Date(now - 120 * 1000);
      const url = process.env.PHONE_CHECK_URL;
      const apiKey = process.env.PHONE_CHECK_API_KEY;
      const isJSON = 1;
      const recipients = phoneNumber;

      const check = await UserSchema.findOne({ phoneNumber: recipients });

      if (check) {
        return res.status(400).json({ message: "Номер телефона уже занят" });
      }

      function generateRandomCode() {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const randomCode = await generateRandomCode();

      const data = new URLSearchParams();
      data.append("api_id", apiKey);
      data.append("to", '+7' + recipients);
      data.append("msg", randomCode);
      data.append("json", isJSON);

      const checkCode = await PhoneCodes.findOne({ phoneNumber: recipients });

      if (checkCode) {
        if (checkCode.updatedAt > oneMinuteAgo) {
          return res.status(400).json({ message: "Код уже был отправлен" });
        }
      }
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data)
          if (!data.sms.undefined) {
            if (checkCode) {
              await checkCode.updateOne({ randomCode: randomCode });
              res.status(200).json({ data, checkCode });
            } else {
              const phoneData = await new PhoneCodes({
                phoneNumber: recipients,
                randomCode: randomCode,
              });
              await phoneData.save();
              res.status(200).json({ data, phoneData });
            }
          } else {
            res
              .status(404)
              .json({ error: data, message: data.sms.undefined.status_text });
          }
        })
        .catch((error) => res.status(500).json(error));
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static login = async (req, res) => {
    try {
      const phoneNumber = phoneFilter(req.body.phoneNumber);

      const user = await UserSchema.findOne({ phoneNumber: phoneNumber });

      if (!user) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const key = user.role === "Admin" ? process.env.JWT_ADMIN_KEY : process.env.JWT_KEY;

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );

      if (!isValidPass) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        key,
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({ ...userData, token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static getUser = async (req, res) => {
    try {
      const user = await UserSchema.findById(req.userId).populate({
        path: "orders",
        populate: [
          {
            path: "items",
            populate: {
              path: "category",
            },
          },
          {
            path: "status",
          },
        ],
      })

      const { passwordHash, ...userData } = user._doc;

      res.json(userData);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static createAdmin = async (req, res) => {
    try {
      const phoneNumber = phoneFilter(req.body.phoneNumber);

      const isUserExist = await UserSchema.findOne({
        phoneNumber: phoneNumber,
      });

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      if (isUserExist) {
        const updated = await UserSchema.findOneAndUpdate(
          { phoneNumber: phoneNumber },
          { $set: { role: "Admin" } },
          { new: true }
        );

        const token = jwt.sign(
          {
            _id: updated._id,
          },
          process.env.JWT_ADMIN_KEY,
          {
            expiresIn: "5d",
          }
        );

        return res.status(200).json({ updated, token });
      }

      const fields = {
        firstName: req.body.name,
        phoneNumber: phoneNumber,
        passwordHash: hash,
        role: "Admin",
      };

      const user = await new UserSchema(fields);

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_ADMIN_KEY,
        {
          expiresIn: "5d",
        }
      );

      await user.save();

      res.status(200).json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static addToWishlist = async (req, res) => {
    try {
      const checkUser = await UserSchema.findById(req.userId);
      const checkItem = await ItemSchema.findById(req.body.item);

      if (!checkUser || !checkItem) {
        return res
          .status(404)
          .json({ message: "Возникла ошибка добавления товара в избранное" });
      }

      const alreadyInWishList = checkUser.favourite.includes(req.body.item);
      if (alreadyInWishList) {
        return res
          .status(400)
          .json({ message: "Товар уже добавлен в избранное" });
      }

      const user = await UserSchema.findByIdAndUpdate(
        req.userId,
        { $push: { favourite: req.body.item } },
        { new: true }
      ).populate({
        path: "orders",
        populate: [
          {
            path: "items",
            populate: {
              path: "category",
            },
          },
          {
            path: "status",
          },
        ],
      });;
      console.log(user)
      res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static removeFromWishlist = async (req, res) => {
    try {
      const checkUser = await UserSchema.findById(req.userId);
      const checkItem = await ItemSchema.findById(req.query.item);

      if (!checkUser || !checkItem) {
        return res
          .status(404)
          .json({ message: "Возникла ошибка добавления товара в избранное" });
      }

      const alreadyInWishList = checkUser.favourite.includes(req.query.item);
      if (!alreadyInWishList) {
        return res.status(400).json({ message: "Товара нет в избранном" });
      }

      const user = await UserSchema.findByIdAndUpdate(
        req.userId,
        { $pull: { favourite: req.query.item } },
        { new: true }
      ).populate({
        path: "orders",
        populate: [
          {
            path: "items",
            populate: {
              path: "category",
            },
          },
          {
            path: "status",
          },
        ],
      });;

      res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e, message: errorMSG });
    }
  };
  static getCart = async (req, res) => {
    try {
      let user = await UserSchema.findById(req.userId).populate({
        path: "cart.item",
        populate: { path: "category" },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let updatedCart = [];
      for (let cartItem of user.cart) {
        const item = await ItemSchema.findById(cartItem.item);
  
        if (item) {
          if (item.stock === 0 || item.disabled === true) {
            continue;
          } else if (cartItem.quantity > item.stock) {
            cartItem.quantity = item.stock;
          }
          updatedCart.push(cartItem);
        }
      }

      user.cart = updatedCart;
      await user.save();
  
      user = await UserSchema.findById(req.userId).populate({
        path: "cart.item",
        populate: { path: "category" },
      });
  
      return res.json(user.cart);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: "An error occurred while retrieving the cart" });
    }
  };
  
  

  static addToCart = async (req, res) => {
    try {
      const userId = req.userId;
      const itemId = req.body.item;

      const user = await UserSchema.findById(userId).populate({
        path: "orders",
        populate: [
          {
            path: "items",
            populate: {
              path: "category",
            },
          },
          {
            path: "status",
          },
        ],
      });

      const index = user.cart.findIndex(
        (cartItem) => cartItem.item.toString() === itemId
      );

      if (index === -1) {
        const userUpdated = await UserSchema.findByIdAndUpdate(
          userId,
          { $push: { cart: { item: itemId } } },
          { new: true }
        ).populate({
          path: "orders",
          populate: [
            {
              path: "items",
              populate: {
                path: "category",
              },
            },
            {
              path: "status",
            },
          ],
        })
        return res.status(200).json(userUpdated);

      }

      user.cart[index].quantity++;

      const updatedUser = await user.save();

      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static removeFromCart = async (req, res) => {
    try {
      const user = await UserSchema.findByIdAndUpdate(
        req.userId,
        { $pull: { cart: { item: req.query.itemId } } },
        { new: true }
      ).populate({
        path: "orders",
        populate: [
          {
            path: "items",
            populate: {
              path: "category",
            },
          },
          {
            path: "status",
          },
        ],
      });;

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      return res
        .status(200)
        .json(user);
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: e, message: "Internal server error" });
    }
  };

  static deleteFromCart = async (req, res) => {
    try {
      const userId = req.userId;
      const itemId = req.query.item;

      const user = await UserSchema.findById(userId).populate({
        path: "orders",
        populate: [
          {
            path: "items",
            populate: {
              path: "category",
            },
          },
          {
            path: "status",
          },
        ],
      });;

      const index = user.cart.findIndex(
        (cartItem) => cartItem.item.toString() === itemId
      );

      if (index === -1) {
        return res
          .status(400)
          .json({ message: "В корзине нет данного товара" });
      }

      if (user.cart[index].quantity === 1) {
        const userUpdated = await UserSchema.findByIdAndUpdate(
          userId,
          { $pull: { cart: { item: itemId } } },
          { new: true }
        ).populate({
          path: "orders",
          populate: [
            {
              path: "items",
              populate: {
                path: "category",
              },
            },
            {
              path: "status",
            },
          ],
        });;

        return res.status(200).json(userUpdated);
      }

      user.cart[index].quantity--;

      const updatedUser = await user.save();

      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static updateSeen = async (req, res) => {
    try {
      const check = await ItemSchema.findById(req.body.item);
      if (!check) {
        return res.status(404).json({ message: "Предмет не найден" });
      }

      const added = await UserSchema.findByIdAndUpdate(
        req.userId,
        { $push: { seen: req.body.item } },
        { new: true }
      );

      res.json(added);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const user = await UserSchema.findById(req.userId);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.city = req.body.city;
      user.address = req.body.address;

      const updatedUser = await user.save();

      res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static makeOrder = async (req, res) => {
    try {
      req.body.items.map(async (item) => {
        const check = await ItemSchema.findById(item.item);

        if (!check || check.stock <= 1) {
          return res.status(404).json({ message: "Товар не найден" });
        }

        await ItemSchema.findByIdAndUpdate(item.item, {
          $inc: { stock: -item.quantity, sold: +item.quantity },
        });
      });

      const currentDate = new Date();
      const utcOffset = 3;
      currentDate.setHours(currentDate.getHours() + utcOffset);

      const statusFields = {
        statusName: "В обработке",
        date: currentDate,
      };

      const status = await new OrderStatusSchema(statusFields);

      await status.save();

      const statusId = status._id;

      const orderItemsIds = req.body.items.map((item) => item.item);

      const orderFields = {
        items: orderItemsIds,
        status: [statusId],
        date: currentDate,
        price: req.body.price,
        delivery: req.body.delivery,
        payment: req.body.payment,
        paid: true,
        addres: req.body.addres,
        track: "",
      };

      const order = await new OrderSchema(orderFields);

      await order.save();

      await UserSchema.findByIdAndUpdate(
        req.userId,
        { $push: { orders: order._id } },
        { new: true }
      );

      const user = await UserSchema.findById(req.userId);
      user.cart = [];
      await user.save();

      return res.json(order);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static getSearch = async (req, res) => {
    try {
      const user = await UserSchema.findById(req.userId);

      return res.json(user.seen);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static searchItems = async (req, res) => {
    try {

      const searchCategory = await SubCategorySchema.find({
        $or: [{ name: { $regex: new RegExp(req.body.search, "i") } }],
      });

      const categoryIds = searchCategory.map((category) => category._id);

      const searchTags = await TagSchema.find({
        $or: [{ name: { $regex: new RegExp(req.body.search, "i") } }],
      });

      const uniqueIds = new Set();

      const tagIds = searchTags.map((tag) => tag._id);

      const searchItemsByNameDescription = await ItemSchema.find({
        $or: [
          { name: { $regex: new RegExp(req.body.search, "i") } },
          { description: { $regex: new RegExp(req.body.search, "i") } },
        ],
      });

      const searchItemsByCategoryTags = await ItemSchema.find({
        $or: [{ category: { $in: categoryIds } }, { tags: { $in: tagIds } }],
      });

      const allItems = [
        ...searchItemsByNameDescription,
        ...searchItemsByCategoryTags,
      ].filter((item) => {
        if (uniqueIds.has(item._id.toString())) {
          return false;
        } else {
          uniqueIds.add(item._id.toString());
          return true;
        }
      });

      const populatedItems = await ItemSchema.populate(allItems, ["category"]);

      console.log(populatedItems)

      return res.json(allItems);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };
  
  static updatePassword = async (req, res) => {
    try {
      const user = await UserSchema.findById(req.userId);

      const isValidPass = await bcrypt.compare(
        req.body.oldPassword,
        user._doc.passwordHash
      );

      if (req.body.oldPassword === req.body.password) {
        return res.status(400).json({ message: "Вы ввели текущий пароль" });
      }

      if (!isValidPass) {
        return res.status(400).json({
          message: "Вы ввели неверный пароль",
        });
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const userUpdated = await UserSchema.findByIdAndUpdate(req.userId, {
        passwordHash: hash,
      });

      const { passwordHash, ...userData } = userUpdated._doc;

      res.json({ ...userData });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static passwordRecovery = async (req, res) => {
    try {
      const phoneNumber = phoneFilter(req.body.phoneNumber);

      const isPhoneValid = await UserSchema.findOne({
        phoneNumber: phoneNumber,
      });
      const phoneCode = await PhoneCodes.findOne({ phoneNumber: phoneNumber });

      const isSamePass = await bcrypt.compare(
        req.body.password,
        isPhoneValid._doc.passwordHash
      );

      if (isSamePass) {
        return res.status(400).json({ message: "Вы ввели текущий пароль" });
      }

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      if (!isPhoneValid) {
        return res
          .status(400)
          .json({ message: "Номер телефона введен неверно" });
      }

      if (phoneCode.randomCode !== req.body.phoneCode) {
        return res.status(400).json({ message: "Код введён неверно!" });
      }

      const user = await UserSchema.findByIdAndUpdate(isPhoneValid._id, {
        passwordHash: hash,
      });

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).json({ user, token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const user = await UserSchema.findByIdAndUpdate(req.userId, {
        disabled: req.body.disable,
      });

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static getWishList = async (req, res) => {
    try {
      const user = await UserSchema.findById(req.userId).populate({
        path: "favourite",
        populate: {
          path: "category",
        },
      });

      return res.json(user.favourite);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e, message: errorMSG });
    }
  };

  static getAllPhoneNumbers = async (req, res) => {
    try {
      const phoneNums = await UserSchema.find().select('phoneNumber')

      return res.json(phoneNums)
    } catch (error) {
      console.log(e)
      res.status(500).json({ error: e, message: errorMSG });
    }
  }
}
