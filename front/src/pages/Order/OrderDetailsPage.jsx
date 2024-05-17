import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../service/orderService";
import UserLayout from "../../components/layout/UserPanel";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import StatusProduct from "../../components/StatusProduct";
import AdminPanelLayout from "../../components/layout/AdminPanelLayout";
import { showErrorMessageByAxiosError, showSuccessMessage } from "../../utilitis/toaster";
const OrderDetailsPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  let { id } = useParams();
  const [OrderInfo, setOrderInfo] = useState({
    id,
    products: [],
    status: "",
    totalPrice: 0,
    userId: {},
  });
   const [status, setStatus] = useState(OrderInfo.status);

  useEffect(() => {
    if (id) {
      OrderService.getOrder(id)
        .then(({ data }) => {
          setOrderInfo(data);
          console.log(data);
          setStatus(data.status)
        })
        .catch((error) => {
          showErrorMessageByAxiosError(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      try {
        setIsAdmin(
          JSON.parse(localStorage.getItem("userInfo")).role === "admin"
        );
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const changeStatus = (e) => {
    e.preventDefault();
     OrderService.updateStatus(id,status)
       .then(({ data }) => {
        showSuccessMessage("Status changed Successful");
         setStatus(data.status);
       })
       .catch((error) => {
         showErrorMessageByAxiosError(error);
       });
  };

  return (
    <>
      {isAdmin ? (
        <AdminPanelLayout>
          <Container className="mt-5">
            <h3 className="mb-4">Order Details</h3>
            <Card className="mb-4">
              <Card.Header className="fw-bold">User Information</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Name:</strong> {OrderInfo.userId.firstName}{" "}
                      {OrderInfo.userId.lastName}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Email:</strong> {OrderInfo.userId.email}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>Order Information</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderInfo.products.map((product, index) => (
                      <tr key={product.id.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={product.id.image}
                            alt={product.id.title}
                            width="50"
                          />
                        </td>
                        <td>{product.id.title}</td>
                        <td>${product.id.price.toFixed(2)}</td>
                        <td>{product.qty}</td>
                        <td>${(product.id.price * product.qty).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="5" className="text-end">
                        <strong>Total Price</strong>
                      </td>
                      <td>
                        <strong>${OrderInfo.totalPrice.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <h6 className="mt-4">
                  Order Status: <StatusProduct status={status} />
                </h6>
                <form className="mt-4" onSubmit={changeStatus}>
                  <div className="row">
                    <div className="col">
                      <select
                        className="form-control"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="col">
                      <button className="btn btn-info" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Container>
        </AdminPanelLayout>
      ) : (
        <UserLayout>
          <Container className="mt-5">
            <h3 className="mb-4">Order Details</h3>

            <Card className="mb-4">
              <Card.Header className="fw-bold">Order Information</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderInfo.products.map((product, index) => (
                      <tr key={product.id.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={product.id.image}
                            alt={product.id.title}
                            width="50"
                          />
                        </td>
                        <td>{product.id.title}</td>
                        <td>${product.id.price.toFixed(2)}</td>
                        <td>{product.qty}</td>
                        <td>${(product.id.price * product.qty).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="5" className="text-end">
                        <strong>Total Price</strong>
                      </td>
                      <td>
                        <strong>${OrderInfo.totalPrice.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <h6 className="mt-4">
                  Order Status: <StatusProduct status={OrderInfo.status} />
                </h6>
              </Card.Body>
            </Card>
          </Container>
        </UserLayout>
      )}
    </>
  );
};

export default OrderDetailsPage;
