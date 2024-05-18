const mongoose = require("mongoose");
const Order = require("../models/Order");
const orderValidate = require("../validators/order.validate");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId products.id"); // Populate user and product details
    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }
    const order = await Order.findById(orderId).populate("userId products.id"); // Populate user and product details
    if (!order) {
      return res.status(404).json({ message: "Order Not Found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID" });
    }
    const orders = await Order.find({ userId }).populate("userId products.id"); // Populate user and product details
    if (!orders.length) {
      return res.status(404).json({ message: "No Orders Found for this User" });
    }
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    // const { error } = orderValidate.validate(req.body); // Use validator
    // if (error) return res.status(400).send({ message: error.message });

    const order = new Order({ ...req.body }); // Destructure and spread body
    const savedOrder = await order.save();
    return res.status(201).json(savedOrder); // Created status code
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error Creating Order", error: err.message }); // Handle validation errors
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = orderValidate.validate(req.body); // Use validator
    if (error) return res.status(400).send({ message: error.message });

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Apply validation on update
    });

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order Not Found" });
    }

    return res.status(200).json(updatedOrder); // Send the updated order
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error Updating Order", error: err.message }); // Handle validation errors
  }
};
exports.updateStatusOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    const updatedOrder = await Order.findByIdAndUpdate(id, { status: status }, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order Not Found" });
    }

    return res.status(200).json(updatedOrder); // Send the updated order
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error Updating Order", error: err.message }); // Handle validation errors
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id); // Delete and return deleted order

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order Not Found" }); // Informative message for non-existent order
    }

    return res.status(200).json({ message: "Order Deleted Successfully" }); // Success message
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "Error Deleting Order", error: err.message }); // Handle validation errors
  }
};
