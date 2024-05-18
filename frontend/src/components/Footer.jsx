import React from "react";
import { Link } from "react-router-dom";

// footer component
function Footer() {
  return (
    <footer className="py-3 bg-dark">
      <ul className="nav justify-content-center border-bottom border-secondary pb-3 ">
        <li className="nav-item">
          <Link
            to="/home"
            className="nav-link px-2 text-white"
            aria-current="page"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about-us" className="nav-link px-2 text-white">
            About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact-us" className="nav-link px-2 text-white">
            Contact Us
          </Link>
        </li>
      </ul>
      <p className="text-center text-secondary pt-3">
        © 2024 <b className="text-white">Furniture</b>
        <b className="text-warning">World</b>, Inc, Amir Akhoundi
        <br />
        All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
