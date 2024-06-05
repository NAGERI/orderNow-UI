import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storeReducer from "./storeSlice";
import itemReducer from "./itemSlice";
import orderReducer from "./orderSlice";
import paymentReducer from "./paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
    item: itemReducer,
    order: orderReducer,
    payment: paymentReducer,
  },
});

export default store;
