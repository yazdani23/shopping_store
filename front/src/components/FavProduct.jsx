import React, { useEffect, useState } from 'react'
import { showErrorMessage, showErrorMessageByAxiosError } from '../utilitis/toaster';
import UserService from '../service/userService';

const FavProduct = ({ id }) => {
  const [favorite, setFavorite] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setIsLogin(true);
      const { favProductList } = JSON.parse(localStorage.getItem("userInfo"));
      favProductList.map((item) => {
        if (item == id) {
          setFavorite(true);
        }
      });
    }
  }, []);

  const toggleFavorite = () => {
    if (!isLogin) {
      showErrorMessage("You should be login first");
    } else {
      if (favorite)
        UserService.deleteProductFromFavoriteList(id)
          .then((res) => {
            setFavorite(false);
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const favProductList = userInfo.favProductList.filter(
              (item) => item !== id
            );
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ ...userInfo, favProductList })
            );
          })
          .catch((err) => {
            showErrorMessageByAxiosError(err);
          });
      else
        UserService.addProductToFavoriteList(id)
          .then((res) => {
            setFavorite(true);
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const favProductList = userInfo.favProductList;
            favProductList.push(id);
            localStorage.setItem(
              "userInfo",
              JSON.stringify({ ...userInfo, favProductList })
            );
          })
          .catch((err) => {
            showErrorMessageByAxiosError(err);
          });
    }
  };
  return (
    <span
      onClick={toggleFavorite}
      className={`fw-bold fs-5 ${!isLogin && "text-body-tertiary fs-6"}`}
    >
      <i
        className={`bi ${favorite ? "bi-heart-fill text-danger" : "bi-heart"} `}
      ></i>
    </span>
  );
};

export default FavProduct