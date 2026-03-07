import axios from "./axios";

export const addToWatchlist = (data, token) =>
  axios.post("/watchlist/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getWatchlist = (token) =>
  axios.get("/watchlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteWatchlistItem = (id, token) =>
  axios.delete(`/watchlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });