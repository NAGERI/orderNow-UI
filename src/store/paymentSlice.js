import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/api";

export const processPayment = createAsyncThunk(
  "payment/processPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/payments", paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
