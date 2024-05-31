import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../utils/api";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const response = await getUserDetails(token);
    return response.data;
  }
  return null;
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
