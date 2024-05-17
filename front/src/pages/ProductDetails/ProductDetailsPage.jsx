import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imageDefault from "../../assets/images/default.jpg";
import "./ProductDetailsPage.css";
import ProductService from "../../service/productService";
import {
  showErrorMessageByAxiosError,
  showSuccessMessage,
} from "../../utilitis/toaster";
import Layout from "../../components/layout/Layout";
import ManageQty from "../../components/ManageQty";
import { useSelector } from "react-redux";
import FavProduct from "../../components/FavProduct";
// import NewCartModal from "../../components/newCartModal/newCartModal";
// import CartService from "../../service/cartService";

export const DATE_FORMAT_STANDARD = "DD-MM-YYYY";

function ProductDetailsPage() {

  // id of current product
  let { id } = useParams();



  // detail of product
  const [productInfo, setProductInfo] = useState({
    id,
    image: "",
    title: "",
    category: "",
    price: "",
    height: "",
    width: "",
    depth: "",
    weight: "",
    color: "",
    description: "",
    rate: [],
  });

  const [rateStar, setRateStar] = useState([]);
  const manageRate = (rate) => {
    const rateArray = [];
    for (let i = 0; i < rate; i++) {
      rateArray.push(1);
    }
    for (let i = 0; i < 5 - rate; i++) {
      rateArray.push(0);
    }
    return rateArray;
  };

  // load product detail by product id
  useEffect(() => {
    if (id) {
      ProductService.getProductDetailById(id)
        .then(({ data }) => {
          setProductInfo(data);
          setRateStar(manageRate(data.rate));
        })
        .catch((error) => {
          showErrorMessageByAxiosError(error);
        });
    }
  }, [id]);


  return (
    <Layout>
      <div className="container ">
        <img
          className="w-75 m-auto d-block my-4 large-image"
          src={productInfo.image ? productInfo.image : imageDefault}
          alt=""
        />
        <h1 className="text-center">{productInfo.title} </h1>
        <div className="content bg-white rounded-3 border border-1 p-5 my-4">
          <div className="d-flex justify-content-between">
            <div className="mb-3">
              <strong>Rate: </strong>
              <span className="text-warning">
                {rateStar.map((item) =>
                  item ? (
                    <i className="bi bi-star-fill"></i>
                  ) : (
                    <i className="bi bi-star"></i>
                  )
                )}
              </span>
            </div>
            <div className="d-flex  position-relative">
              <FavProduct id={id} />
            </div>
          </div>
          <div className="mb-3">
            <b className="pe-2">Category: </b> {productInfo.category.name}
          </div>

          <div className="row justify-content-between mb-3">
            <div className="col">
              <b className="pe-2">Price: </b>
              {productInfo.price}
            </div>
            <div className="col">
              <div className="d-flex justify-content-end">
                <ManageQty product={productInfo} />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <b className="pe-2">Width: </b> {productInfo.width}
          </div>
          <div className="mb-3">
            <b className="pe-2">Height: </b> {productInfo.height}
          </div>
          <div className="mb-3">
            <b className="pe-2">Depth: </b> {productInfo.depth}
          </div>
          <div className="mb-3">
            <b className="pe-2">weight: </b> {productInfo.weight}
          </div>
          <div className="mb-3">
            <b className="pe-2">Color: </b> {productInfo.color}
          </div>
          <div className="mb-3">
            <b>Description:</b>
          </div>
          <div className="mb-3">{productInfo.description}</div>
        </div>
        {/* <NewCartModal
        show={showCartModal}
        handleSubmit={handleSubmit}
        handleClose={handleCloseModal}
        reservedDates={productInfo.reservedDates}
      /> */}
      </div>
    </Layout>
  );
}

export default ProductDetailsPage;
