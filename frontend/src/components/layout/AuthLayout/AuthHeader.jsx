import React from 'react'
import logo from "../../../assets/images/logo_4.png";
import { Link } from 'react-router-dom';
const AuthHeader = () => {
  return (
    <div>
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>
      <div className="text-center mt-4 name">
        Furniture<span className="text-warning">World</span>
      </div>
    </div>
  );
}

export default AuthHeader