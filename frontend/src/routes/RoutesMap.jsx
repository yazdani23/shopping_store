import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ForgetPasswordPage from "../pages/ForgetPassword/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPassword/ResetPasswordPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import AboutUsPage from "../pages/AboutUs/AboutUsPage";
import RolesPage from "../pages/Roles/RolesPage";
import ContactUsPage from "../pages/ContactUs/ContactUsPage";

import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import UserPanelPage from "../pages/UserPanel/UserPanelPage";
import FavoriteListPage from "../pages/UserPanel/FavoriteListPage";
import CreateEditProductPage from "../pages/AdminPanel/CreateEditProductPage";
import AdminOrderListPage from "../pages/AdminPanel/AdminOrderListPage";
import AdminUserListPage from "../pages/AdminPanel/AdminUserListPage";
import AdminProductListPage from "../pages/AdminPanel/AdminProductListPage";
import AdminContactListPage from "../pages/AdminPanel/AdminContactListPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import CategoriesListPage from "../pages/AdminPanel/CategoriesListPage";
import CreateEditCategory from "../pages/AdminPanel/CreateEditCategoryPage";
import OrdersListPage from "../pages/UserPanel/OrdersListPage";
import OrderDetailsPage from "../pages/Order/OrderDetailsPage";
import ConfirmOrderPage from "../pages/ConfirmOrder/ConfirmOrder";


function RoutesMap() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/confirmOrder" element={<ConfirmOrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="/resetPassword" element={<ResetPasswordPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/roles" element={<RolesPage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/categories/:name" element={<CategoryPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route path="/oreder-details/:id" element={<OrderDetailsPage />} />

      <Route path="/user-panel" element={<UserPanelPage />} />
      <Route
        path="/user-panel/favoriteProduct"
        element={<FavoriteListPage />}
      />
      <Route path="/user-panel/userOrders" element={<OrdersListPage />} />
      <Route
        path="/admin-panel/create-edit-product/"
        element={<CreateEditProductPage />}
      />
      {/* /*Edit(update) product route (wegen id): */}
      <Route
        path="/admin-panel/create-edit-product/:id"
        element={<CreateEditProductPage />}
      />
      <Route
        path="/admin-panel/create-edit-category/"
        element={<CreateEditCategory />}
      />
      {/* /*Edit(update) product route (wegen id): */}
      <Route
        path="/admin-panel/create-edit-category/:id"
        element={<CreateEditCategory />}
      />
      <Route
        path="/admin-panel/categoryList"
        element={<CategoriesListPage />}
      />
      <Route path="/admin-panel/userList" element={<AdminUserListPage />} />
      <Route
        path="/admin-panel/productList"
        element={<AdminProductListPage />}
      />
      <Route path="/admin-panel/orderList" element={<AdminOrderListPage />} />
      <Route
        path="/admin-panel/contactList"
        element={<AdminContactListPage />}
      />
      <Route
        path="/admin-panel"
        element={<Navigate to={"/admin-panel/userList"} />}
      />
    </Routes>
  );
}

export { RoutesMap };
