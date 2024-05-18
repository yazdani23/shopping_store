// Navbar:
import React, { useEffect, useState } from 'react'
import "./Categories.css"
import CategoryItem from './CategoryItem'
import CategoryService from '../../service/categoryService';


// category navbar component for display categories and filter products
function Categories() {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
     CategoryService.getCategories()
       .then((res) => {
         setCategories(res.data);
       })
       .catch((error) => console.error(error));
   }, []);
   
    return (
      <div className="categories-navbar container d-flex justify-content-center flex-nowrap  overflow-auto">
        {categories.map((item) => (
          <CategoryItem key={item.id} {...item} />
        ))}
      </div>
    );
}

export default Categories
