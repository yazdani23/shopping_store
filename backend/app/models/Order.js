const mongoose = require("mongoose");

const OrderShema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      // enum: ["Pending", "Processing", "Shipped", "Delivered", "Canceled"],
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
      default: "Pending",
    },
    description: String,
  },
  { timestamps: true }
);

OrderShema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});
module.exports = mongoose.model("Order", OrderShema);
