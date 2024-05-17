import myAxios from "./api";

// list of data fetches for categories
const CategoryService = {
  getCategories: () => {
    return myAxios.get(`/categories`);
  },
  createCategory: (category) => {
    return myAxios.post(`/categories/create`, category);
  },
  getCategoryDetailById: (id) => {
    return myAxios.get(`/categories/${id}`);
  },
  editCategory: (id, category) => {
    return myAxios.put(`/categories/edit/${id}`, category);
  },
  deleteCategory: (categoryId) => {
    return myAxios.delete(`/categories/delete/${categoryId}`);
  },
  uploadImage: (formData) => {
    return myAxios.post("/categories/uploadImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default CategoryService;
