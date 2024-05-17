import React, {useEffect, useState} from 'react';
import AdminService from "../../service/adminService";
import {showErrorMessageByAxiosError} from "../../utilitis/toaster";
import { Link } from "react-router-dom";
import AdminPanelLayout from '../../components/layout/AdminPanelLayout';
import ProductDataTable from '../../components/Products/ProductTable/ProductDataTable';

// admin page for show list of all products
const AdminProductListPage = () => {
  

  return (
    <AdminPanelLayout>
      <Link
        className="btn btn-success my-4  "
        to="/admin-panel/create-edit-product/"
      >
        Add New Product
      </Link>
      <h3>All Products list</h3>
      <ProductDataTable/>
    </AdminPanelLayout>
  );
};

export default AdminProductListPage;
