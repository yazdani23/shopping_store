import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import AuthService from "../../service/authService";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import axios from "axios";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";

// login page
function LoginPage() {
  // navigate function
  let navigate = useNavigate();

  // state for username and password input value
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // submit form and send username and password to server
  const onLoginClick = (e) => {
    e.preventDefault();
    // validate inputs
    if (!userInfo.email || !userInfo.password) return;
    // send username (Email) and password to server and get token
    AuthService.login(userInfo.email, userInfo.password)
      .then(({ data }) => {
        showSuccessMessage("Login successful!");
        // store token and user info in localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        // set all request header by this token
        axios.defaults.headers.common = {
          token: data.token,
        };
        // navigate to home
        if (data.userInfo.role == "admin") {
          navigate("/admin-panel");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        showErrorMessageByAxiosError(error);
      });
  };

  return (
    <AuthLayout>
      <form className="p-3 mt-3" onSubmit={onLoginClick}>
        <input name="email" id="email" className="hiddenInputs" />
        <input type="password" className="hiddenInputs" />

        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            value={userInfo.email}
            placeholder="Email"
            name="email"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <span className="fas fa-key"></span>
          <input
            type="password"
            name="password"
            id="pwd"
            value={userInfo.password}
            placeholder="Password"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>
        <button className="btn mt-3" type="submit">
          Login
        </button>
      </form>
      <div className="text-center fs-6">
        <Link to="/forgetPassword">Forget password?</Link> or{" "}
        <Link to="/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
