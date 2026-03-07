import axios from "./axios";

export const registerUser = (data) =>
  axios.post("/auth/register", data);

export const loginUser = (data) =>
  axios.post("/auth/login", data);

export const getProfile = (token) =>
  axios.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });