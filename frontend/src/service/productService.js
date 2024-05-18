import myAxios from "./api";

// list of data fetches for products
const ProductService = {
  getProductUser: () => {
    return myAxios.get("/products-user");
  },
  getProductsByCategory: (category, search = "") => {
    return myAxios.get(`/products/category/${category}`, {
      params: { search },
    });
  },
  getAllProductWithSearch: (search) => {
    return myAxios.get("/products", {
      params: {
        search,
      },
    });
  },
  uploadImage: (form) => {
    return myAxios.post("/products/uploadImage", form);
  },

  getProductDetailById: (id) => {
    return myAxios.get(`/products/${id}`);
  },
  deleteProduct: (productId) => {
    return myAxios.delete(`/products/delete/${productId}`);
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

  addProduct: (product) => {
    return myAxios.post(`/products/create`, product);
  },
  editProduct: (id, product) => {
    return myAxios.put(`/products/edit/${id}`, product);
  },
};

export default ProductService;
