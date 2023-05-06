import express from "express";
const router = express.Router();
import { auth, isAdmin } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  getFilteredProductsController,
  getProductController,
  getProductsBySearchController,
  getProductsController,
  getProductsCountController,
  getProductsListController,
  getSimilarProductsController,
  imageProductController,
  updateProductController,
} from "../controllers/ProductsController.js";

router.post(
  "/create-product",
  auth,
  isAdmin,
  formidable(),
  createProductController
);
// get all products
router.get("/get-products", getProductsController);

// get single product
router.get("/get-product/:slug", getProductController);

// update product
router.put(
  "/update-product/:id",
  auth,
  isAdmin,
  formidable(),
  updateProductController
);
// delete product
router.delete("/delete-product/:id", auth, isAdmin, deleteProductController);

// image
router.get("/image-product/:pid", imageProductController);

//product filters
router.post("/get-products-by-filter", getFilteredProductsController);

//product count
router.get("/get-products-count", getProductsCountController);

// product list
router.get("/get-products-list/:page", getProductsListController);

//search product
router.get("/search-product/:keyword", getProductsBySearchController);

//similar products
router.get("/similar-products/:pid/:cid", getSimilarProductsController);

export default router;
