// da sind die Liste, welche gehört zu Admin
const express = require("express");
const {
  getAllUsers,
  getAllProducts,
  getAllOrders,
  getAllContacts,
} = require("../controllers/adminController");
const router = express.Router();

//get product list
router.get("/admin/products", getAllProducts);

//get user list
router.get("/admin/users", getAllUsers);

//get order list
router.get("/admin/orders", getAllOrders);

// get message list
router.get("/admin/contacts", getAllContacts);

module.exports = router;
