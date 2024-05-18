import React, { useEffect, useState } from "react";
import AdminService from "../../service/adminService";
import { showErrorMessageByAxiosError } from "../../utilitis/toaster";
import AdminPanelLayout from "../../components/layout/AdminPanelLayout";
import moment from "moment/moment";
import OrderService from "../../service/orderService";
import UserLayout from "../../components/layout/UserPanel";
import { Link } from "react-router-dom";
import StatusProduct from "../../components/StatusProduct";
// admin page for show list of all carts
const OrdersListPage = () => {
  // all carts state
  const [orders, setOrders] = useState([]);

  // fetch cart list
  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("userInfo"));
    OrderService.getUserOrders(id)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => showErrorMessageByAxiosError(err));
  }, []);

  return (
    <UserLayout>
      <h5> All Orders list</h5>
      {orders.length ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm table-hover align-middle">
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Total Price</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.totalPrice}$</td>
                    <td>
                      <span>{moment(item.createdAt).format("YYYY-MM-DD")}</span>
                      <span className="ms-3">
                        {moment(item.createdAt).format("hh:mm")}
                      </span>
                    </td>
                    <td><StatusProduct status={item.status}/></td>
                    <td>
                      <Link to={`/oreder-details/${item.id}`}>
                        <button
                          title="View"
                          className="border border-none border-primary bg-white rounded-3 me-2 bi bi-eye-fill delete-icon text-primary  px-3"
                          type="button"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>There are no Orders.</h1>
      )}
    </UserLayout>
  );
};

export default OrdersListPage;
