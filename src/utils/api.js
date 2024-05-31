// src/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_URL,
});

export const login = (credentials) => api.post("/auth/signin", credentials);

export const signup = (data) => api.post("/auth/signup", data);

export const getStores = (token) =>
  api.get("/stores", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getStoreById = (id, token) =>
  api.get(`/stores/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getAllStores = (token) =>
  api.get(`/stores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createStore = (store, token) =>
  api.post("/stores", store, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateStore = (id, store, token) =>
  api.put(`/stores/${id}`, store, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deactivateStore = (id, token) =>
  api.patch(`/stores/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getStoreItems = (storeId, token) =>
  api.get(`/items/by-store/${storeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createStoreItem = (itemData, token) =>
  api.post("/items", itemData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateStoreItem = (token, itemData, itemId) =>
  api.put(`/items/${itemId}`, itemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUserDetails = (token) =>
  api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrdersByUser = (token) =>
  api.get("/orders/by-user", {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getOrderStatusAmount = (token) =>
  api.get("/orders/status-and-quantity", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const placeItemsOrder = (token, orderData) =>
  api.post("/orders", orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
