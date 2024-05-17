const mongoose = require("mongoose");

/*
schema for contact model
 */
const ContactSchema = mongoose.Schema({
  name: String,
  email: String,
  // user id of user which create this contact
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
});

ContactSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});
module.exports = mongoose.model("contact", ContactSchema);// name von Collection : "cart" , Contact = funkction
