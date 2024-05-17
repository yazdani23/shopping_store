import { createSlice } from "@reduxjs/toolkit";

const getInitialBasket = () => {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  return Array.isArray(savedCart) ? savedCart : [];
};

const getTotalQty = () => {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  let totalQty = 0;
  savedCart?.forEach((item) => {
    totalQty += item.qty;
  });
  return totalQty;
};

const getUserId = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "";
  return userInfo.id;
};

const cartSlice = createSlice({
  name: "userCart",
  initialState: {
    totalQty: getTotalQty(),
    basket: getInitialBasket(),
  },

  reducers: {
    addToBasket: (state, action) => {
      const newItem = action.payload.product;
      const itemIndex = state.basket.findIndex(
        (item) => item.id === newItem.id
      );

      if (itemIndex !== -1) {
        state.basket[itemIndex].qty += 1;
      } else {
        state.basket.push({ ...newItem, qty: 1 });
      }
      state.totalQty += 1;
      localStorage.setItem("cart", JSON.stringify(state.basket));
    },
    increaseQty: (state, action) => {
      const id = action.payload.id;
      const itemIndex = state.basket.findIndex((item) => item.id === id);

      state.basket[itemIndex].qty += 1;

      state.totalQty += 1;
      localStorage.setItem("cart", JSON.stringify(state.basket));
    },
    decreaseQty: (state, action) => {
      const id = action.payload.id;
      const itemIndex = state.basket.findIndex((item) => item.id === id);

      state.basket[itemIndex].qty -= 1;

      state.totalQty -= 1;
      localStorage.setItem("cart", JSON.stringify(state.basket));
    },
    removeFromBasket: (state, action) => {
      const itemIdToRemove = action.payload.id;
      state.basket = state.basket.filter((item) => item.id !== itemIdToRemove);
      state.totalQty -= 1;
      localStorage.setItem("cart", JSON.stringify(state.basket));
    },
    checkoutCart: (state, action) => {
      state.basket = [];
      state.totalQty = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  increaseQty,
  decreaseQty,
  checkoutCart,
} = cartSlice.actions;
export default cartSlice.reducer;
