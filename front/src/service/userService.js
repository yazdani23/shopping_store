import myAxios from "./api";

// list of data fetches for products
const UserService = {
 
  uploadImage: (form) => {
    return myAxios.post("/products/uploadImage", form);
  },

  deleteProductFromFavoriteList: (productId) => {
    return myAxios.delete(`/user/favorite/${productId}`);
  },
  addProductToFavoriteList: (productId) => {
    return myAxios.put(`/user/favorite/${productId}`);
  },

  getFavoriteList: () => {
    return myAxios.get("/user/favorite");
  },
};

export default UserService;
