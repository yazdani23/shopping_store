const Product = require("../models/Product");
const User = require("../models/User");
const { productValidate } = require("../validator/product.validate");

/*
controller of route /products/:id
get product detail
 */
const getProduct = async (req, res) => {
 try {
   let id = req.params.id;
   // find product by id
   let product = await Product.findById(id).populate("category", "name");
   return res.send(product);
 } catch (error) {
   console.log(error);
   return res.status(500).send({});
 }
};

/*
controller of route /products
get list of products
 */
const getAllProducts = async (req, res) => {
 try {
   const search = req.query.search; // für eine bestimmte item suchen(in URL wird gezeigt: .../products?search=id von gesuchte Item)

   let products;
   //searchRegex definiert für search, dass es unabhängig von Groß- und Kleinschreibung behandelt werden und case-insensitive sein.
   const searchRegex = new RegExp(`${search}`, "i");
   if (search) {
     /*
         find products where their title or description or brand is match with
        search regex and populate first name and last name of their user
         */
     products = await Product.find({
       $or: [
         { title: { $regex: searchRegex } },
         { description: { $regex: searchRegex } },
         { brand: { $regex: searchRegex } },
       ],
     })
       .sort({ createdAt: -1 })
       .populate("category", "name");
   } else {
     /*
        find all products sorted by last creation time
        and populate first name and last name of their user
        */
     products = await Product.find()
       .populate("category", "name")
       .sort({ createdAt: -1 });
   }

   return res.status(200).send(products);
 } catch (error) {
  console.log(error);
  return res.status(500).send([]);
 }
};

/*
controller of route /categories/:name
get list of products by category
 */
const getProductsCategory = async (req, res) => {
  
 try {
   const search = req.query.search;
   const category = req.params.name;

   // find user data
   let products;
   const searchRegex = new RegExp(`${search}`, "i");
  
   if (search) {
     /*
         find products with category param where their title or description is match with
        search regex and populate first name and last name of their user
         */
     products = await Product.find({
       $or: [
         { title: { $regex: searchRegex } },
         { description: { $regex: searchRegex } },
       ],
       category: category,
     })
       .populate("category", "name")
       .sort({ createdAt: -1 });
   } else {
     /*
       find products with category param sorted by last creation time
       and populate first name and last name of their user
       */
     products = await Product.find({ category: category })
       .populate("category", "name")
       .sort({ createdAt: -1 });
   }

   // if user logged in and each product exist in fav product list set product isFav 'TRUE'

   return res.status(200).send(products);
 } catch (error) {
  console.log(error);
   return res.status(500).send([]);
 }
};


/*
controller of route /products/uploadImage
upload image and return image path
 */

const uploadImageProduct = (req, res, next) => {
  try {
    let imageUrl = "";
    // create link hostname
    const url = req.protocol + "://" + req.get("host");
    console.log(req.file);
    if (req.file) {
      const imageName = req.file.filename;
      // add file name to link host name
      imageUrl = url + "/public/images/products/" + imageName;
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

/*
controller of route /products/create .
create product
 */
const createProduct = async (req, res) => {
   
  try {
    // validate of user body is valid for create product or not
    const { error } = productValidate.validate(req.body);
    if (error) return res.status(400).send({ message: error.message });
   console.log(req.body);
    const product = new Product({
      ...req.body, 
    });

    await product.save();
    return res.status(201).send({ message: "create product successful", product });
  } catch (err) {
    return res
      .status(500)
      .send({ error: true, message: "create product failed" });
  }
};

/*
controller of route /products/edit/:id
update product by id
 */
const editProduct = async (req, res) => {
  try {
    let id = req.params.id;

    // find product which must updated and change fields by request body
    let result = await Product.findByIdAndUpdate(id, {
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

/*
controller of route /products/delete/:id
delete product by id
 */
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    // find product which must updated and delete them
    await Product.findByIdAndDelete(id);
    return res.status(200).send({ message: "product delete successful" });
  } catch (error) {
    return res.status(500).send({ error: true, message: "delete product failed" });
  }
};

module.exports = {
  createProduct,
  editProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  uploadImageProduct,
  getProductsCategory,
};
