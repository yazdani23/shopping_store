import React, { useEffect, useState } from "react";
import "./UserPanelPage.css";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import UserLayout from "../../components/layout/UserPanel";
import UserService from "../../service/userService";

function FavoriteListPage() {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // check token exist in localstorage, else navigate user to login page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      showSuccessMessage("You must login first!");
      navigate("/login");
    } else {
      setIsLogin(true);
    }
  }, [isLogin]);

  // list of products
  const [products, setProducts] = useState([]);
  // id of selected product
  const [id, setId] = useState("");

  // fetch favorite product list on first render
  useEffect(() => {
    UserService.getFavoriteList()
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        showErrorMessageByAxiosError(error);
      });
  }, []);

  // delete product from favorite list
  const deleteProduct = () => {
    UserService.deleteProductFromFavoriteList(id)
      .then(({ data }) => {
        showSuccessMessage(data.messages);
        setProducts((products) => products.filter((item) => item.id !== id));
      })
      .catch((error) => {
        showErrorMessageByAxiosError(error);
      });
  };

  return (
    <UserLayout>
      <h5> Favorite Products List</h5>
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.category.name}</td>
                <td>{item.price}</td>
                <td className="text-center">
                  <button
                    title="delete"
                    className="border border-none border-danger bg-white rounded-3 me-2 bi bi-trash3-fill delete-icon text-danger  px-3"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    onClick={() => setId(item.id)}
                  />
                  <Link to={`/product-details/${item.id}`}>
                    <button
                      title="View"
                      className="border border-none border-warning bg-white rounded-3 me-2 bi bi-eye-fill delete-icon text-warning  px-3"
                      type="button"
                    />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-5">
                <h3>There is no product</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete Item
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              Are you sure to delete this product from favorite list?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default FavoriteListPage;
