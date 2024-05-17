const mongoose = require("mongoose");

const CategoryShema = mongoose.Schema({
  image: { type: String },
  name: { type: String }
});

CategoryShema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});


module.exports = mongoose.model("Category", CategoryShema);
