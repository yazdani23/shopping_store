const mongoose = require("mongoose");

// schema of user model
const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, min: 3, required: true },
    lastName: { type: String, min: 3 },
    email: { type: String, unique: true, required: true },
    address: { type: String },
    phone: { type: String },
    password: { type: String, required: true },
    favProductList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    ordersList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // code which sent to user for recovery password
    verifyCode: String,
  },
  { timestamps: true }
);
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    // Remove sensitive fields from the JSON representation
    delete ret.password;
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("User", UserSchema);
