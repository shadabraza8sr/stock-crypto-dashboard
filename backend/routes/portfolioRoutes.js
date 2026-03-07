// routes/portfolioRoutes.js
const express = require("express");
const {
  addAsset,
  getPortfolio,
  deleteAsset,
} = require("../controllers/portfolioController");

const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Add asset
router.post("/", verifyUser, addAsset);

// Get portfolio
router.get("/", verifyUser, getPortfolio);

// Delete asset
router.delete("/:id", verifyUser, deleteAsset);

module.exports = router;