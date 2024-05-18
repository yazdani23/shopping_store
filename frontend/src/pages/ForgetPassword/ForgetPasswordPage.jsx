import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgetPasswordPage.css";
import AuthService from "../../service/authService";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  // submit form and send email to server
  const onSubmitClick = (e) => {
    e.preventDefault();
    if (!email) return;
    AuthService.forgetPassword(email)
      .then(() => {
        showSuccessMessage("please check your inbox or spam!");
      })
      .catch((error) => {
        showErrorMessageByAxiosError(error);
      });
  };

  return (
    <AuthLayout>
      <form className="p-3 mt-3" onSubmit={onSubmitClick}>
        <input name="email" id="email" className="hiddenInputs" />
        <input type="password" className="hiddenInputs" />
        <div className="form-field d-flex align-items-center">
          <span className="far fa-user"></span>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn mt-3" type="submit">
          Send Recovery Link
        </button>
      </form>
      <div className="text-center fs-6">
        <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link>
      </div>
    </AuthLayout>
  );
}

export default ForgetPasswordPage;
