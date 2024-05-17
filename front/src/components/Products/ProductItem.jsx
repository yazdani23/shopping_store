import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  showErrorMessage,
  showErrorMessageByAxiosError,
} from "../../utilitis/toaster";
import defaultImage from "../../assets/images/default-placeholder.png";
import ManageQty from "../ManageQty";
import UserService from "../../service/userService";
import FavProduct from "../FavProduct";

// component for show single product
function ProductItem({ product }) {
  const { id, image, title, category, price } = product;

  return (
    <div className="col  text-black product-item ">
      <div className="card h-100 ">
        {/* image wird angezeigt: */}
        <Link to={`/product-details/${id}`} className="text-decoration-none">
          <img
            src={image ? image : defaultImage}
            className="card-img-top image-card"
            alt="..."
          />
        </Link>

        <div className="card-body">
          <div className="d-flex justify-content-between">
            <Link
              to={`/product-details/${id}`}
              className="text-decoration-none"
            >
              <h5 className="card-title text-info-emphasis">{title}</h5>
            </Link>

            <FavProduct id={id} />
          </div>

          <p className="username ">
            <span className="text-muted">Category: </span>
            {category.name}
          </p>

          <p className="card-text description">Price: {price}$</p>
        </div>
        <div className="card-footer d-flex justify-content-center justify-content-lg-between align-items-center">
          <Link
            className="card-footer-btn d-none d-lg-block btn btn-warning text-white text-decoration-none"
            to={`/product-details/${id}`}
          >
            Details
          </Link>
          <ManageQty product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
