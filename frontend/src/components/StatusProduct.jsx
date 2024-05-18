import React from "react";

const StatusProduct = ({ status }) => {
  switch (status) {
    case "Pending":
      return <span className="text-warning">{status}</span>;
    case "Accepted":
      return <span className="text-success">{status}</span>;
    case "Rejected":
      return <span className="text-danger">{status}</span>;

    default:
      return <span className="text-warning">{status}</span>;
  }
  
};

export default StatusProduct;
