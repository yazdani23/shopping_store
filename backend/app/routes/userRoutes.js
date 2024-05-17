const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middlewares/authMiddleWare");
const {
  removeProductFromFavList,
  addProductToFavList,
  getFavoriteList,
} = require("../controllers/userController");

//get list of favorite
router.get("/user/favorite", authMiddleWare, getFavoriteList);
//add product to fav list by product id
router.put("/user/favorite/:productId", authMiddleWare, addProductToFavList);
//remove product from fav list by product id
router.delete("/user/favorite/:productId", authMiddleWare, removeProductFromFavList);

module.exports = router;
