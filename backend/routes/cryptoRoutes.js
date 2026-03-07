// routes/cryptoRoutes.js
const express = require("express");
const { getCryptoPrices } = require("../controllers/cryptoController");

const router = express.Router();

// Get crypto prices
router.get("/prices", getCryptoPrices);

module.exports = router;