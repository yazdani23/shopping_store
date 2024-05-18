import React, { useEffect, useState } from "react";
import "./UserPanelPage.css";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import UserLayout from "../../components/layout/UserPanel";

function UserPanelPage() {
  let navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  // check token exist in localstorage, else navigate user to login page
  useEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("userInfo")) {
      showSuccessMessage("You must login first!");
      localStorage.clear();
      navigate("/login");
    } else {
      setIsLogin(true);
    }
  }, [isLogin]);



  return (
    <UserLayout>
      <div className="container mt-5 text-center">
        <div className="w-75 mx-auto alert alert-success" role="alert">
          <h4 className="alert-heading">Welcome</h4>
          <p>Your Panel</p>
          <hr />
          <h6 className="mb-0">
            <p className="mb-2">
              You can manage your dashboard and access your user information
            </p>
            through the options in the sidebar.
          </h6>
        </div>
      </div>
    </UserLayout>
  );
}

export default UserPanelPage;
