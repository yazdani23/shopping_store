import React from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  return (
    <Layout>
      <div className="container mt-5 text-center">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Order Confirmed!</h4>
          <p>Your order has been successfully registered.</p>
          <hr />
          <h6 className="mb-0">
            You can view and follow it in{" "}
            <Link to="/user-panel/userOrders">your panel</Link>.
          </h6>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentPage