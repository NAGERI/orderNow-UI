import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createStoreItem, getStoreItems, updateStoreItem } from "../utils/api";

export const fetchItems = createAsyncThunk(
  "item/fetchItems",
  async (storeId) => {
    const token = localStorage.getItem("token");
    const response = await getStoreItems(storeId, token);
    return response.data;
  }
);

export const addItem = createAsyncThunk(
  "item/addItem",
  async (item, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await createStoreItem(item, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  "item/updateItem",
  async (item, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await updateStoreItem(token, item, item.id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;
