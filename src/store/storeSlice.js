import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStore,
  deactivateStore,
  getAllStores,
  updateStore,
} from "../utils/api";

export const fetchStores = createAsyncThunk("store/fetchStores", async () => {
  const token = localStorage.getItem("token");
  const response = await getAllStores(token);
  return response.data;
});

export const addStore = createAsyncThunk("store/addStore", async (store) => {
  const token = localStorage.getItem("token");
  const response = await createStore(store, token);
  return response.data;
});

export const updateStoreSlice = createAsyncThunk(
  "store/updateStore",
  async (store) => {
    const token = localStorage.getItem("token");
    const response = await updateStore(store.id, store, token);
    console.log(response.data);
    return response.data;
  }
);

export const deleteStore = createAsyncThunk(
  "store/deleteStore",
  async (storeId) => {
    const token = localStorage.getItem("token");
    const response = await deactivateStore(storeId, token);
    return response.data;
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState: {
    stores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.stores.push(action.payload);
      })
      .addCase(updateStoreSlice.fulfilled, (state, action) => {
        const index = state.stores.findIndex(
          (store) => store.id === action.payload.id
        );
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter(
          (store) => store.id !== action.payload
        );
      });
  },
});

export default storeSlice.reducer;
