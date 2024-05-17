import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import {
  showErrorMessage,
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import AuthService from "../../service/authService";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";

function SignupPage() {
  let navigate = useNavigate();
  // state for userInfo
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // validate inputs value
  const isValid = () => {
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.password
    )
      return "all input must entered";
  };

  // submit form and signup user
  const formHandler = (e) => {
    e.preventDefault();

    const error = isValid();
    if (error) return showErrorMessage(error);

    AuthService.signup(userInfo)
      .then(({ data }) => {
        showSuccessMessage(data.message);
        navigate("/login");
      })
      .catch((error) => {
        showErrorMessageByAxiosError(error);
      });
  };
  return (
    <AuthLayout>
      <form className="p-3 mt-3" onSubmit={formHandler}>
        <input name="email" id="email" className="hiddenInputs" />
        <input type="password" className="hiddenInputs" />

        <div className="form-field d-flex align-items-center">
          <i className="bi bi-person text-secondary fs-4"></i>
          <input
            type="text "
            name="firstName"
            id="firstName"
            value={userInfo.firstName}
            placeholder="First Name"
            onChange={(e) =>
              setUserInfo({ ...userInfo, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <i className="bi bi-person text-secondary fs-4"></i>
          <input
            type="text "
            name="lastName"
            id="lastName"
            value={userInfo.lastName}
            placeholder="Last Name"
            onChange={(e) =>
              setUserInfo({ ...userInfo, lastName: e.target.value })
            }
          />
        </div>

        <div className="form-field d-flex align-items-center">
          <i className="bi bi-envelope text-secondary fs-4"></i>
          <input
            name="email"
            type="email "
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <i className="bi bi-key text-secondary fs-4"></i>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            id="pwd"
            placeholder="Password"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>

        <button className="btn mt-3" type="submit">
          Signup
        </button>
      </form>
      <div className="text-center fs-6">
        <Link to="/login">Are you already signup?</Link>
      </div>
    </AuthLayout>
  );
}

export default SignupPage;
