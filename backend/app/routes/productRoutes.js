const express = require("express");
const router = express.Router();
// alle Funktionen, die in Controller definieren sind, importiert
const {
    editProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    uploadImageProduct,
    getProductsCategory,
    createProduct
} = require("../controllers/productController");

const uploadMulter = require("../middlewares/uploadImageMiddleware");
const authMiddleWare = require("../middlewares/authMiddleware");


// get product detail
router.get("/products/:id", getProduct);
// get list of products
router.get("/products", getAllProducts);
// get list of products by category
router.get("/products/category/:name", getProductsCategory);
// create product
router.post("/products/create", authMiddleWare, createProduct);
// upload image and return image path
router.post(
  "/products/uploadImage",
  [authMiddleWare, uploadMulter("products")],
  uploadImageProduct
);
// update product by id
router.put("/products/edit/:id", authMiddleWare, editProduct);
// delete product by id
router.delete("/products/delete/:id", authMiddleWare, deleteProduct);

module.exports = router;

