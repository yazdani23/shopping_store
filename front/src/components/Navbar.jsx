import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryService from "../service/categoryService";

// show categories navbar
function Navbar() {
  const { name } = useParams();
 const [categories, setCategories] = useState([]);

 useEffect(() => {
   CategoryService.getCategories()
     .then((res) => {
       setCategories(res.data);
     })
     .catch((error) => console.error(error));
 }, []);
  return (
    <nav className="d-flex justify-content-center py-3  ">
      <ul className="nav justify-content-start justify-content-md-center nav-pills flex-nowrap overflow-auto w-100 flex-nowrap container">
        {categories.map((item, index) => (
          <li className="nav-item" key={item.id}>
            <Link
              key={index}
              to={`/categories/${item.id}`}
              className={`nav-link ${name === item.name && "active"}`}
              aria-current="page"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
