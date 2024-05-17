const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const contactRoutes = require("./contactRoutes");
const orderRouter = require("./orderRoutes");
const categoryRouter = require("./categoryRoutes");

router.use(userRoutes);
router.use(categoryRouter);
router.use(productRoutes);
router.use(authRoutes);
router.use(orderRouter);
router.use(adminRoutes);
router.use(contactRoutes);

module.exports = router;
