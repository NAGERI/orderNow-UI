import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storeReducer from "./storeSlice";
import itemReducer from "./itemSlice";
import orderSlice from "./orderSlice";
import paymentSlice from "./paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
    item: itemReducer,
    order: orderSlice,
    payment: paymentSlice,
  },
});

export default store;
