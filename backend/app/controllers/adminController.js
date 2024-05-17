// In Controller steht Logische teil von diese api:

const User = require("../models/User"); // import user Model
const Product = require("../models/Product");
const Order = require("../models/Order");
const Contact = require("../models/contact");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

/*
 * controller of router /admin/user
 * send list of all users to admin
 */
module.exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

/*
 * /admin/products
 * send list of all product to admin
 */
module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });
  res.send(products);
};
/*
controller of route /admin/orders
get order list
 */
// Get all orders
module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId products.id"); // Populate user and product details
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
/*
controller of route /admin/contacts
get message list
 */
module.exports.getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
};

app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let purchase;

router.get("/", (req, res) => {
  purchase = req.session;
  if (purchase.email) {
    return res.send("you are login");
  }
});
