import React from "react";
import { Link } from "react-router-dom";
import about_1 from "../../assets/images/products/1.jpg";
import about_2 from "../../assets/images/products/2.jpg";
import about_3 from "../../assets/images/products/3.jpg";
import about_4 from "../../assets/images/products/4.webp";
import Layout from "../../components/layout/Layout";
import "./AboutUsPage.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const AboutUsPage = () => {
  return (
    <Layout withoutNavbar>
      <div className="container my-5">
        <h1 className="text-center mb-5">About Us</h1>

        <div className="row g-5 ">
          <div className="col-md-6">
            <img
              src={about_1}
              alt="Modern and stylish furniture"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <p>
              At{" "}
              <Link to="/" className="text-decoration-none text-dark fs-5">
                Furniture<span className="text-warning">World</span>
              </Link>
              , we are passionate about creating beautiful and functional homes
              with high-quality, durable furniture. We are proud to offer a wide
              range of furniture in various styles to suit your taste and needs.
            </p>

            <p>
              We are committed to providing high-quality furniture from top
              brands at affordable prices. We believe that everyone should be
              able to enjoy the beauty and comfort of quality furniture in their
              homes without breaking the bank.
            </p>
          </div>

          <div className="col-md-6">
            <h2 className="mb-4">Top Brands, Lowest Prices</h2>
            <p>
              We are committed to providing high-quality furniture from top
              brands at affordable prices. We believe that everyone should be
              able to enjoy the beauty and comfort of quality furniture in their
              homes without breaking the bank.
            </p>
            <p>
              Today,{" "}
              <span className="fw-bold">
                Furniture<span className="text-warning">World</span>
              </span>
              has grown into one of the leading furniture stores in [Your
              Region]. We continue to offer a wide range of furniture in various
              styles to suit your taste and needs, and we are committed to
              providing excellent customer service to all of our customers.
            </p>
            <p>
              <span className="fw-bold">
                Furniture<span className="text-warning">World</span>
              </span>{" "}
              was founded in 2024 by Amir Akhondi. With a passion for creating
              beautiful and functional homes, Amir founded
              <span className="fw-bold">
                Furniture<span className="text-warning">World</span>
              </span>{" "}
              with the vision of providing high-quality, durable furniture at
              affordable prices to his customers.
            </p>
          </div>

          <div className="col-md-6">
            <h2 className="mb-4">Customer Satisfaction, Our Top Priority</h2>
            <img
              src={about_4}
              alt="Happy customer talking to a store employee"
              className="img-fluid"
            />
          </div>

          <div className="col-md-12">
            <h2 className="mb-4">Follow us on social media:</h2>
            <div className="row">
              <div className="col">
                <img src={about_3} alt="Store founder" className="img-fluid" />
              </div>
              <div className="col ">
                <div className="d-flex h-100 justify-content-center align-items-center mt-4">
                  <ul className="social-media list-style-none  text-warning list-group ">
                    <li>
                      <a className="fs-4 text-warning" href="[Facebook URL]">
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip >Facebook</Tooltip>}
                        >
                          <i className="bi bi-facebook"></i>
                        </OverlayTrigger>
                      </a>
                    </li>
                    <li>
                      <a className="fs-4 text-warning" href="[Instagram URL]">
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Instagram</Tooltip>}
                        >
                          <i className="bi bi-instagram"></i>
                        </OverlayTrigger>
                      </a>
                    </li>
                    <li>
                      <a className="fs-4 text-warning" href="[Twitter URL]">
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Twitter</Tooltip>}
                        >
                          <i className="bi bi-twitter"></i>
                        </OverlayTrigger>
                      </a>
                    </li>
                    <li>
                      <a className="fs-4 text-warning" href="[Pinterest URL]">
                        <OverlayTrigger
                          placement="right"
                          overlay={<Tooltip>Pinterest</Tooltip>}
                        >
                          <i className="bi bi-pinterest"></i>
                        </OverlayTrigger>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
