import React, { useEffect, useState } from "react";
import Categories from "../../components/CategoriesNavbar/CategoriesNavbar";
import Products from "../../components/Products/ProductList";
import ProductService from "../../service/productService";
import { useLocation } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Layout from "../../components/layout/Layout";

function HomePage() {
  // state for search input value
  const [searchItem, setSearchItem] = useState("");
  // info of route
  const location = useLocation();

  /*
        check search query param in address bar
        if search exist set input value
        else set input value empty
     */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("search")) setSearchItem(params.get("search"));
    else setSearchItem("");
  }, [location.search]);

  // state for list products
  const [products, setProducts] = useState([]);

  // get list of all products in first render and refetch on search change
  useEffect(() => {
    ProductService.getAllProductWithSearch(searchItem)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchItem]);

  return (
    <Layout withoutNavbar>
      <Hero />
      <Categories />
      <Products products={products} />
    </Layout>
  );
}

export default HomePage;
