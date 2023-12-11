import { createSlice } from "@reduxjs/toolkit";
import { fetchFood, totPrice } from "../data/localStorages";

const foodIncart = fetchFood();
const total_price = totPrice();
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: foodIncart,
    totalPrice: total_price,
    isShowCart: false,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalPrice =
          parseFloat(state.totalPrice) + parseFloat(existingItem.price);
      } else {
        state.items.push(action.payload);
        state.totalPrice += parseFloat(action.payload.price);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      // console.log(existingItem.quantity);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        existingItem.quantity -= 1;
      }
      state.totalPrice -= existingItem.price;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearAll: (state, action) => {
      state.items = [];
      state.totalPrice = 0.0;
      localStorage.setItem("cart", JSON.stringify([]));
    },
    showCart: (state) => {
      state.isShowCart = !state.isShowCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
