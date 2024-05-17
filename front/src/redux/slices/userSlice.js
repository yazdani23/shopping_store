import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {},
    favProductList: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).favProductList
      : [],
  },
  reducers: {
    addToFavProductList: (state, action) => {
      const { id } = action.payload;
      state.favProductList.push(id);
      const newFavProductList = localStorage.getItem("userInfo").favProductList.length
        ? JSON.parse(localStorage.getItem("userInfo")).favProductList
        : [];
        newFavProductList.push(id)
        localStorage.setItem("userInfo", JSON.stringify(newFavProductList));
    },
    deleteformFavProductList: (state, action) => {
      const { id } = action.payload;
      state.favProductList = state.favProductList.filter((item) => item !== id);
       const newFavProductList = localStorage.getItem("userInfo").favProductList
         .length
         ? JSON.parse(localStorage.getItem("userInfo")).favProductList
         : [];
       newFavProductList.filter((item) => item !== id);
       localStorage.setItem("userInfo", JSON.stringify(newFavProductList));
    },

    userLogin: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    userLogout: (state) => {
      console.log("Logout reducer is called!");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      state.isLogin = false;
      state.userInfo = {};
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
