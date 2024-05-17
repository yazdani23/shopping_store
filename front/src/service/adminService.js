import myAxios from "./api";

// list of data fetch for admin
const AdminService = {
  getUsers: () => {
    return myAxios.get(`/admin/users`);
  },
  getProducts: () => {
    return myAxios.get(`/admin/products`);
  },
  getOrders: () => {
    return myAxios.get(`/admin/orders`);
  },
  getContacts: () => {
    return myAxios.get(`/admin/contacts`);
  },
  
};

export default AdminService;
