import express from "express";
import { upload } from "../utils/multer.js";
import { getAllProducts, createProduct, updateProduct, deleteProduct, } from "../controllers/productsContoller.js";

const productRoute = express.Router();

productRoute.get("/getAllProducts", getAllProducts);
productRoute.post("/createProduct", upload.array("images", 5), createProduct);
productRoute.put("/:id", upload.array("images", 5), updateProduct);
productRoute.delete("/:id", deleteProduct);

export default productRoute;
