// controllers/cryptoController.js
const axios = require("axios");

const getCryptoPrices = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,solana,dogecoin",
          vs_currencies: "usd",
          include_24hr_change: true,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch crypto prices" });
  }
};

module.exports = { getCryptoPrices };