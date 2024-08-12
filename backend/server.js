import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import { wakeServer } from "./utils/wakeServer.js";
import { deleteCodes } from "./utils/deleteCodes.js";
import checkAuth from "./utils/checkAuth.js";
import checkAdmin from "./utils/checkAdmin.js";

import userController from "./controllers/userController.js";
import itemController from "./controllers/itemController.js";
import categoryController from "./controllers/categoryController.js";
import tagController from "./controllers/tagController.js";
import promoController from "./controllers/promoController.js";
import saleController from "./controllers/saleController.js";
import reviewController from "./controllers/reviewController.js";
import selectionController from "./controllers/selectionContoller.js";
import blogController from "./controllers/blogController.js";
import multer from "multer";
import showcaseController from "./controllers/showcaseController.js";
import brandController from "./controllers/brandController.js";
import collectionController from "./controllers/collectionController.js";
import orderController from "./controllers/orderController.js";
import facesCategoryController from "./controllers/facesCategoryController.js";
dotenvConfig();

const app = express();

app.use(express.json());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    }, filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5173", "https://lunacosmetics.ru", "http://localhost:5173", "https://lunacosmetics.onrender.com", "https://adminluna.netlify.app"],
    credentials: true,
  })
);
app.use("/uploads", express.static('uploads'))


mongoose
  .connect(process.env.NODE_DB_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const PORT = process.env.PORT || 4444;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is running");
});

wakeServer();

//GET

app.get("/user", checkAuth, userController.getUser);

app.get("/getfacecollection", facesCategoryController.getCollectionFace)

app.get("/item", itemController.getItem); //В query могут передаваться значения _id:string и category:string

app.get("/brands", itemController.getBrands)

app.get('/itemsCategory', itemController.getItemsCategory);

app.get("/category", categoryController.getCategories); //В query могут передаваться значения _id:string и sub:boolean

app.get('/categories', categoryController.getAllCategories)

app.get('/subcategories', categoryController.getAllSubCategories)

app.get('/category-by-id', categoryController.getCategoryAndSubcategoriesById)

app.get("/tag", tagController.getTag); //В query может передаваться значение _id:string

app.get("/wishlist", checkAuth, userController.getWishList);

app.get("/cart", checkAuth, userController.getCart);

app.get("/search", userController.getSearch);

app.get("/promo", checkAuth, promoController.usePromo); //В query могут передаваться значения code:string и price:number

app.get("/sale", saleController.getSale); //В query может передаваться значение _id:string

app.get("/sales", saleController.getSales);

app.get("/collection", collectionController.getCollection); //В query может передаваться значение _id:string

app.get("/collections", collectionController.getCollections);

app.get("/new", itemController.getNew);

app.get("/topsellers", itemController.topSellers);

app.get("/selection", selectionController.getSelection); //В query может передаваться значение _id:string

app.get("/newshowcase", itemController.newShowcase)

app.get("/newshowcasefull", itemController.newShowcasefull)

app.get("/topshowcase", itemController.topShowcase)

app.get("/blogpost", blogController.getPost) //В query может передаваться значение _id:string

app.get('/showcase', showcaseController.getShowcase)

app.get("/brand", brandController.getBrand)

app.get('/all-brands', brandController.getAllBrands)

app.get('/orders', orderController.getAllOrders)

app.get('/order/:id', orderController.getOrder);

app.get('/all-phone-numbers', checkAdmin, userController.getAllPhoneNumbers)

app.get('/checkreview', checkAuth, reviewController.checkReview)

app.get("/facescategory/:id", facesCategoryController.getFacesCategory);
app.get("/facescategory", facesCategoryController.getFacesCategory);
app.get("/facescategoryitem", facesCategoryController.getFacesCategoryItem);

//POST

app.post("/collection", checkAdmin, collectionController.createCollection)

app.post("/phone", userController.checkPhone);

app.post("/user", userController.createUser);

app.post("/auth", userController.login);

app.post("/admin", checkAdmin, userController.createAdmin);

app.post("/item", itemController.createItem);

app.post("/category", checkAdmin, categoryController.createCategory);

app.post("/tag", checkAdmin, tagController.createTag);

app.post("/promo", checkAdmin, promoController.createPromo);

app.post("/order", checkAuth, userController.makeOrder);

app.post("/search", userController.searchItems); //В query может передаваться значение _id:string

app.post("/sale", checkAdmin, saleController.createSale);

app.post("/review", checkAuth, reviewController.createReview);

app.post("/selection", checkAdmin, selectionController.addSelection);

app.post("/blogpost", checkAdmin, blogController.addPost)

app.post("/showcase", checkAdmin, showcaseController.createShowcase)

app.post("/brand", checkAdmin, brandController.createBrand)

app.post("/facescategory", checkAdmin, facesCategoryController.createFacesCategory)

app.post('/upload', upload.array('images'), (req, res) => {
  console.log(req.files)
  const imagesUrls = req.files.map(file => `/uploads/${file.filename}`);
  res.json(imagesUrls);
});

//PATCH

app.patch("/wishlist", checkAuth, userController.addToWishlist);

app.patch("/cart", checkAuth, userController.addToCart);

app.patch("/seen", checkAuth, userController.updateSeen);

app.patch('/brand/:id', checkAdmin, brandController.updateBrand)

app.patch("/promo", checkAdmin, promoController.updateActive); //В query нужно передавать значение _id:string

app.patch("/category", checkAdmin, categoryController.updateCategory); //В query нужно передавать значение _id:string

app.patch("/updatepass", checkAuth, userController.updatePassword);

app.patch("/passrecovery", userController.passwordRecovery);

app.patch("/itemstock", checkAdmin, itemController.updateStock); //В query нужно передавать значение _id:string

app.patch("/itemprice", checkAdmin, itemController.updatePrice); //В query нужно передавать значение _id:string

app.patch("/selection", checkAdmin, selectionController.updateSelectionItems); //В query нужно передавать значение _id:string

app.patch("/sale", checkAdmin, saleController.addItemToSale);

app.patch("/collection", checkAdmin, collectionController.addItemToCollettion);

app.patch("/user", checkAuth, userController.updateUser);

app.patch("/enableitem", checkAdmin, itemController.enableItem)

app.patch("/reloadpass", userController.reloadPass)

app.patch("/checkphonereload", userController.checkPhoneReload)

app.patch('/item', checkAdmin, itemController.updateItem)

app.patch('/order/:id', checkAdmin, orderController.updateOrder)

app.patch('/collection/:id', collectionController.updateCollection)

app.patch('/update-sale/:id', checkAdmin, saleController.updateSale)

app.patch('/enable-category', checkAdmin, categoryController.enableCategory)

app.patch("/facescategory", checkAdmin, facesCategoryController.updateFacesCategory)

app.patch('/facesitem', facesCategoryController.FacesItemUpdate)

//DELETE

app.delete("/phonecodes", deleteCodes);

app.delete("/facescategory", checkAdmin, facesCategoryController.disableFacesCategory)

app.delete("/item", checkAdmin, itemController.deleteItem); //В query нужно передавать значение _id:string

app.delete("/category", checkAdmin, categoryController.deleteCategory); //В query нужно передавать значение _id:string

app.delete("/user", checkAuth, userController.deleteUser);

app.delete("/review", checkAuth, reviewController.deleteReview); //В query нужно передавать значение _id:string

app.delete("/selection", checkAdmin, selectionController.disableSelection); //В query нужно передавать значение _id:string

app.delete("/blogpost", checkAdmin, blogController.disablePost) //В query нужно передавать значение _id:string

app.delete("/cart", checkAuth, userController.deleteFromCart) //В query нужно передавать значение item:string

app.delete("/wishlist", checkAuth, userController.removeFromWishlist);//В query нужно передавать значение item:string

app.delete("/sale", checkAdmin, saleController.removeItemFromSale); //В query нужно передавать значение _id:string

app.delete("/collection", checkAdmin, collectionController.removeItemFromCollection);

app.delete("/showcase", checkAdmin, showcaseController.disableShowcase)

app.delete("/removefromcart", checkAuth, userController.removeFromCart)

app.delete('/brand/:id', checkAdmin, brandController.deleteBrand)
