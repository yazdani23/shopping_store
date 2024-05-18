import React, { useEffect, useState } from 'react'
import ProductService from '../../../service/productService';
import AdminService from '../../../service/adminService';
import RowProductDataTable from './RowProductDataTable';
import { showSuccessMessage } from '../../../utilitis/toaster';

const ProductDataTable = () => {
  // all products state
  const [products, setProducts] = useState([]);

  // fetch product list
  useEffect(() => {
    AdminService.getProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => showErrorMessageByAxiosError(err));
  }, []);

  const removeProduct = (id) => {
    ProductService.deleteProduct(id)
      .then((res) => {
        showSuccessMessage("Delete Product Successful.");
        setProducts((products) => products.filter((item) => item.id !== id));
      })
      .catch((error) => showErrorMessage("Delete Product failed."));
  };
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm table-hover align-middle">
        <thead>
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <RowProductDataTable
              key={item.id}
              number={index + 1}
              {...item}
              removeProduct={removeProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDataTable;