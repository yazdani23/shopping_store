const Category = require("../models/Category.js");
const { categoryValidate } = require("../validator/category.validate");

const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  return res.status(200).send(categories);
};

const getCategoryById = async (req, res) => {
  let id = req.params.id;
  const category = await Category.findById(id);
  return res.status(200).json(category);
};

const uploadImageCategory = async (req, res, next) => {
  try {
    let imageUrl = "";
    // create link hostname
    const url = req.protocol + "://" + req.get("host");
    if (req.file) {
      const imageName = req.file.filename;
      imageUrl = url + "/public/images/categories/" + imageName;
    }
    return res.status(201).send({
      error: false,
      message: "upload image success",
      fileName: imageUrl,
    });
  } catch (err) {
    return res.status(500).send({ error: true, message: err });
  }
};

const createCategory = async (req, res) => {
  try {
    
    // const { error } = categoryValidate.validate(req.body);
    // if (error) return res.status(400).send({ error: error.message });
    console.log(req.body);

    const categoryByName = await Category.findOne({ name: req.body.name });
    if (categoryByName) {
      return res.status(400).send({ error: "Duplicat Category" });
    }

    const category = Category({
      ...req.body,
    });
    await category.save();
    return res
      .status(201)
      .send({ message: "Create category successful", category });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // const { error } = categoryValidate.validate(req.body);
    // if (error) return res.status(400).send({ message: error.message });

    let result = await Category.findByIdAndUpdate(id, {
      $set: req.body,
    });

    if (result) {
      return res.status(200).send({ message: "edit product successful" });
    } else {
      return res
        .status(404)
        .send({ error: true, message: "product not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: true, message: "edit product failed" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    // find product which must delete them
    const result = await Category.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: true, message: "delete product failed" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  editCategory,
  deleteCategory,
  uploadImageCategory,
};
