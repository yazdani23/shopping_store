const mongoose = require("mongoose");

// schema of product model
const ProductSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true },
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number },
    weight: { type: Number },
    color: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    rate: { type: String, default: 3 },
    brand: { type: String },
  },
  { timestamps: true }
); // create timestamp creation and update time for product model

ProductSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Product", ProductSchema);
