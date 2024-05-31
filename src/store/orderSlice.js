import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeItemsOrder } from "../utils/api";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log(orderData);
      const response = await placeItemsOrder(token, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    cart: [],
    orderStatus: "idle",
    error: null,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.itemId === itemId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ itemId, quantity });
      }
    },
    removeItemFromCart: (state, action) => {
      const { itemId } = action.payload;
      state.cart = state.cart.filter((item) => item.itemId !== itemId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderStatus = "loading";
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.orderStatus = "succeeded";
        state.cart = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  orderSlice.actions;
export default orderSlice.reducer;
