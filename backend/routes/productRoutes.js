import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/products").post(protect, createProduct);

router.route("/").get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
