import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth";
import cartSlice from "./cartSlice";
import confirmBoxSlice from "./boxSlice";
import orderSlice from "./orderSlice";
import restuarantSlice from "./RestuarantSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    box: confirmBoxSlice.reducer,
    order: orderSlice.reducer,
    rest: restuarantSlice.reducer,
  },
});

export default store;