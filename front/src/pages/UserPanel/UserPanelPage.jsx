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
    <h3>Welcome</h3>
    </UserLayout>
  );
}

export default UserPanelPage;
