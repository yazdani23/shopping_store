import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    userReducer,
    cartReducer,
  },
});

export default store;
