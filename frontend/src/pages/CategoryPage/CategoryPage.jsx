import React, {useEffect, useState} from 'react'
import Products from '../../components/Products/ProductList';
import {useParams} from 'react-router-dom';
import ProductService from "../../service/productService";
import {useLocation} from 'react-router-dom'
import Layout from '../../components/layout/Layout';

function CategoryPage() {

    // state for list of products
    const [products, setProducts] = useState([]);

    // state for selected category
    const {name} = useParams()

    // state for input search value

    const [searchItem, setSearchItem] = useState("")
    const location = useLocation();

    /*
       check search query param in address bar
       if search exist set input value
       else set input value empty
    */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("search"))
            setSearchItem(params.get("search"))
        else setSearchItem("")
    }, [location.search])

    // load list of products by category and search value on first render and each param change
    useEffect(() => {
        ProductService.getProductsByCategory(name,searchItem)
            .then(({data}) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [name,searchItem]); 

    return (
      <Layout>
        <Products products={products} />
      </Layout>
    );
}

export default CategoryPage
