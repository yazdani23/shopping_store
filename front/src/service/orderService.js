import myAxios from "./api";

// list of data fetches for carts
const OrderService = {
  newOrder: (order) => {
    return myAxios.post(`/orders`, order);
  },
  getUserOrders: (userId) => {
    return myAxios.get(`/orders/user/${userId}`);
  },
  getOrder: (orderId) => {
    return myAxios.get(`/orders/${orderId}`);
  },
  updateStatus: (orderId, status) => {
    return myAxios.patch(`/orders/${orderId}`, {status});
  },
};

export default OrderService;
