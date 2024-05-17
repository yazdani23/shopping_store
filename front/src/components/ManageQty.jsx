import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  decreaseQty,
  increaseQty,
  removeFromBasket,
} from "../redux/slices/cartSlice";

const ManageQty = ({ product }) => {

  const id = product.id;
  const [qty, setQty] = useState(0);
  const basket = useSelector((state) => state.cartReducer.basket);

  useEffect(() => {
    const item2 = basket.find((item) => item.id == id);
    item2 && setQty(item2.qty);
  }, []);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addToBasket({ product }));
    setQty(qty + 1);
  };
  const increaseProductQty = () => {
    dispatch(increaseQty({ id }));
    setQty(qty + 1);
  };
  const decreaseProductQty = () => {
    if (qty !== 1) {
      dispatch(decreaseQty({ id }));
      setQty(qty - 1);
    } else {
      dispatch(removeFromBasket({ id }));
      setTimeout(() => {
        setQty(qty - 1);
      }, 700);
    }
  };

  return (
    <>
      {qty ? (
        <div className="d-flex justify-content-between align-items-center">
          {qty == 1 ? (
            <i
              className="btn bi bi-trash3 border text-danger"
              onClick={decreaseProductQty}
            ></i>
          ) : (
            <div
              className="btn btn-light border text-danger"
              onClick={decreaseProductQty}
            >
              -
            </div>
          )}

          <span className="bg-info-subtle px-2 py-1 rounded-circle mx-2">
            {qty}
          </span>
          <div
            className="btn  btn-light border text-info"
            onClick={increaseProductQty}
          >
            +
          </div>
        </div>
      ) : (
        <button
          className="card-footer-btn btn btn-info text-white "
          onClick={addToCart}
        >
          Add to cart
        </button>
      )}
    </>
  );
};

export default ManageQty;
