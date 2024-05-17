const express = require("express");
const {
  getCategoryById,
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
  uploadImageCategory,
} = require("../controllers/categoryController");
const authMiddleWare = require("../middlewares/authMiddleware");
const uploadMulter = require("../middlewares/uploadImageMiddleware");
const categoryRouter = express.Router();

// get category detail
categoryRouter.get("/categories/:id", getCategoryById);

// get list of categories
categoryRouter.get("/categories", getAllCategories);
// get list of categories by category

// create category
categoryRouter.post("/categories/create", authMiddleWare, createCategory);

// upload image and return image path
categoryRouter.post(
  "/categories/uploadImage",
  [authMiddleWare, uploadMulter("categories")],
  uploadImageCategory
);
// update category by id
categoryRouter.put("/categories/edit/:id", authMiddleWare, editCategory);
// delete category by id
categoryRouter.delete("/categories/delete/:id", authMiddleWare, deleteCategory);

module.exports = categoryRouter;
