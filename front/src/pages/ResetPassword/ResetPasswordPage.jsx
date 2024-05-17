import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";
import {
  showErrorMessage,
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import AuthService from "../../service/authService";
import AuthLayout from "../../components/layout/AuthLayout/AuthLayout";

function ResetPasswordPage() {
  let navigate = useNavigate();

  // form contain new password input and new password confirm
  const [userInfo, setUserInfo] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });

  const location = useLocation();

  // submit form and send new password to server
  const onResetClick = (e) => {
    e.preventDefault();
    // validate new password
    if (!userInfo.newPassword || !userInfo.newPasswordConfirm) return;
    if (userInfo.newPassword !== userInfo.newPasswordConfirm)
      return showErrorMessage("must be same");
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (!code) return showErrorMessage("code required");
    AuthService.resetPassword(userInfo.newPassword, code)
      .then(() => {
        showSuccessMessage("password changed successfully!");
        navigate("/login");
      })
      .catch((error) => {
        showErrorMessageByAxiosError(error);
      });
  };

  return (
    <AuthLayout>
      <div className="wrapper">
        <form className="p-3 mt-3" onSubmit={onResetClick}>
          <input name="email" id="email" className="hiddenInputs" />
          <input type="password" className="hiddenInputs" />
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="password"
              value={userInfo.newPassword}
              placeholder="New Password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, newPassword: e.target.value })
              }
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              value={userInfo.newPasswordConfirm}
              placeholder="New Password Confirm"
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  newPasswordConfirm: e.target.value,
                })
              }
            />
          </div>
          <button className="btn mt-3" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default ResetPasswordPage;
