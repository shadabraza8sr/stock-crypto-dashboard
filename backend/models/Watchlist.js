// routes/watchlistRoutes.js
const express = require("express");
const Watchlist = require("../models/Watchlist");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Add coin to watchlist
router.post("/", verifyUser, async (req, res) => {
  try {
    const { coinId, coinName } = req.body;

    const newItem = await Watchlist.create({
      userId: req.user,
      coinId,
      coinName,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user watchlist
router.get("/", verifyUser, async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;