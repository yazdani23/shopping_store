import {
  Link,
  useLocation,
  useParams,
  useNavigate,
  matchPath,
} from "react-router-dom";
import { useEffect, useState } from "react";
import defaultAvatar from "../assets/images/default-avatar.png";
import logo from "../assets/images/logo_3.png";
import { showSuccessMessage } from "../utilitis/toaster";
import { useSelector } from "react-redux";

// header component for common pages
function Header({ search }) {
  const totalQty = useSelector((state) => state.cartReducer.totalQty);
  let navigate = useNavigate();
  // state for user is logged in or not
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  // state for user is admin or not
  const [isAdmin, setIsAdmin] = useState(false);
  // state for search input value
  const [searchText, setSearchText] = useState("");

  const location = useLocation(); // Dieser Hook gibt das aktuelle Standortobjekt zurück

  /*
       check search query param in address bar
       if search exist set input value
       else set input value empty
    */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search")) setSearchText(params.get("search"));
    else setSearchText("");
  }, [location.search]);

  // category param
  const { name } = useParams();

  ///////// search //////////
  const sendSearch = (e) => {
    e.preventDefault();
    if (search) search(searchText);
    else {
      // if category page append search query to end of category route
      if (matchPath("/categories/:name", location.pathname))
        navigate(`/categories/${name}?search=` + searchText);
      else navigate(`/home?search=${searchText}`);
    }
  };

  // set isAdmin and isLogin state based on localstorage info
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
      try {
        setFullName(JSON.parse(localStorage.getItem("userInfo")).fullName);
        setIsAdmin(
          JSON.parse(localStorage.getItem("userInfo")).role === "admin"
        );
      } catch (err) {
        console.error(err);
      }
    }
  }, [isLogin]);

  ///////////// logout ////////////
  const logout = () => {
    showSuccessMessage("logout successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <nav className="navbar-header bg-dark text-white container-fluid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4  align-items-center gy-3 ">
        <div className="col">
          <Link
            to="/"
            className="text-decoration-none text-white bg-dark fs-5 "
          >
            <img className="logo-header me-2" src={logo} alt="" />
            Furniture<span className="text-warning">World</span>
          </Link>
        </div>
        <div className="col">
          <ul className="navbar-header-nav flex-row justify-content-between  justify-content-md-end justify-content-lg-start navbar-nav mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link to="/home" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="nav-link">
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact-us" className="nav-link ">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <form
            className="d-flex search-form  position-relative w-100"
            onSubmit={sendSearch}
          >
            <input
              className="form-control me-2 rounded-3 py-2"
              value={searchText}
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />

            {/* cursor: "pointer": handzeiger */}
            <i
              className="bi bi-search position-absolute "
              onClick={sendSearch}
              style={{ cursor: "pointer" }}
            ></i>
          </form>
        </div>
        <div className="col">
          <div className="d-flex align-items-center justify-content-between justify-content-md-end w-100">
            {!isLogin ? (
              <div className="d-flex me-3">
                <Link to="/login" className="btn btn-warning me-3">
                  Login
                </Link>

                <Link to="/signup" className="btn btn-warning">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="dropdown text-end me-3">
                <div
                  className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={defaultAvatar}
                    alt=""
                    className="bi me-2 rounded-circle"
                    width="40"
                  ></img>
                  <div className="text-white">{fullName}</div>
                </div>
                <ul
                  className="dropdown-menu text-small"
                  aria-labelledby="dropdownUser1"
                >
                 
                  {isAdmin ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/admin-panel">
                          Admin Panel
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link className="dropdown-item" to="/user-panel">
                        User Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item" to="#" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div className="cart ">
              <Link to="/checkout" className="text-decoration-none">
                <i className="bi bi-cart3 fs-4 text-white"></i>
                <span className="quantity-total-cart text-warning">
                  {totalQty}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
