import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ManageQty from "../../components/ManageQty";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../utilitis/toaster";
import { checkoutCart } from "../../redux/slices/cartSlice";
import Layout from "../../components/layout/Layout";
import CartService from "../../service/orderService";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cartReducer.basket);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const { id } = JSON.parse(localStorage.getItem("userInfo"));
      setUserId(id);
    }
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const checkoutHandle = () => {
    if (!userId) {
      showErrorMessage("Please Login To Checkout!");
    } else {
      CartService.newOrder({
        products: cartItems,
        userId,
        totalPrice: calculateTotalPrice(),
      })
        .then((res) => {
          showSuccessMessage("Order registered Successful.");
          navigate("/peyment");
          dispatch(checkoutCart());
        })
        .catch((error) => showErrorMessage("Order registered failed."));
    }
  };

  return (
    <Layout>
      <Container>
        <h1 className="mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <Row>
            <Col md={8} lg={9}>
              <div className="shadow p-3">
                {cartItems.map((item, index) => (
                  <Row
                    key={item.id}
                    className={`py-3 align-items-center gy-2 ${
                      index < cartItems.length - 1 && "border-bottom"
                    }`}
                  >
                    <Col>
                      <Image src={item.image} alt={item.title} width={75} />
                    </Col>
                    <Col>
                      <div className="fs-6 fw-bold">{item.title}</div>
                      <p>Price: ${item.price}</p>
                    </Col>
                    <Col>
                      <div className="d-flex">
                        <ManageQty product={item} />
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
            <Col md={4} lg={3}>
              <div className="summary shadow p-5 d-flex flex-column justify-content-between">
                <h5 className="mb-4">Cart Summary</h5>
                <p>Total Quantity: {calculateTotalQuantity()}</p>
                <p>Total Price: ${calculateTotalPrice()}</p>
                <div className="">
                  {!userId && (
                    <Link to="/login" className="btn btn-primary mb-3">
                      Login to checkout
                    </Link>
                  )}
                  <button
                    className={`btn btn-warning text-white ${
                      !userId && "opacity-75 text-dark"
                    }`}
                    onClick={checkoutHandle}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export default CheckoutPage;
