const User = require("../models/User");

/*
 controller of route /favorite
 get list of favorite
 */
const getFavoriteList = async (req, res) => {
  try {
    const userId = req.user.id;
    // find user with user request id and populate favorite product list
    const user = await User.findById(userId).populate({
      path: "favProductList",
      populate: {
        path: "category",
        model: "Category",
      },
    });
    
    res.send(user.favProductList);
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};

/*
controller of route /favorite/:productId
add product to fav list by product id
 */
const addProductToFavList = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    console.log(userId);
    // find data of user
    const user = await User.findById(userId);
    //check if product id exist in fav list send error ..
    if (user.favProductList.includes(productId))
      return res
        .status(400)
        .send({ message: "product already added to favorite list" });
    // add product id
    user.favProductList.push(productId);
    user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};

/*
controller of route /favorite/:productId
remove product from fav list by product id
 */
const removeProductFromFavList = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // find data of user
    const user = await User.findById(userId);
    // check if product id does not exist in fav list, send error
    if (!user.favProductList.includes(productId))
      return res
        .status(400)
        .send({ message: "product does not exist in fav list" });
    // remove product id
    user.favProductList.remove(productId);
    user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({});
  }
};
module.exports = {
  getFavoriteList,
  addProductToFavList,
  removeProductFromFavList,
};
