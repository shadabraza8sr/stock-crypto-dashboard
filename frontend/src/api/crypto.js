import axios from "axios";

const API = "https://api.coingecko.com/api/v3/coins/markets";

export const getCryptoPrices = (search = "") => {
  return axios.get(API, {
    params: {
      vs_currency: "usd",
      ids: search, // dynamic search
    },
  });
};