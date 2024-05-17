import React from "react";
import { Link } from "react-router-dom";

const RowProductDataTable = ({
  number,
  id,
  title,
  image,
  category,
  price,
  removeProduct,
}) => {
  return (
    <tr key={id}>
      <td className="px-3">{number}</td>
      <td className="px-3">
        <img src={image} width={70} alt={title} />
      </td>
      <td className="px-3">{title}</td>
      <td className="px-3">{category.name}</td>
      <td className="px-3">{price}</td>
      <td className="px-3">
        <button
          className="btn btn-danger  me-2"
          onClick={() => removeProduct(id)}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
        <Link
          className="btn btn-warning"
          to={`/admin-panel/create-edit-product/${id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
      </td>
    </tr>
  );
};

export default RowProductDataTable;
