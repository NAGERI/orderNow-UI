import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = API_URL.USERS;

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user, { headers: authHeader() });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
