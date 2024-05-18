import AuthHeader from "./AuthHeader";
import "./AuthLayout.css"

const AuthLayout = ({children}) => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <div className="wrapper">
        <AuthHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout