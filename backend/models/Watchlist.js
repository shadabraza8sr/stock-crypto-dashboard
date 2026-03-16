const express = require("express");
const Watchlist = require("../models/Watchlist");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();


// Add coin to watchlist
router.post("/", verifyUser, async (req, res) => {
  try {
    const { coinId, coinName } = req.body;

    // Check if coin already exists
    const existing = await Watchlist.findOne({
      userId: req.user,
      coinId: coinId
    });

    if (existing) {
      return res.status(400).json({
        message: "Coin already in watchlist"
      });
    }

    const newItem = await Watchlist.create({
      userId: req.user,
      coinId,
      coinName
    });

    res.status(201).json(newItem);

  } catch (error) {
    console.error("Watchlist Error:", error);
    res.status(500).json({
      message: "Server error while adding coin"
    });
  }
});


// Get user watchlist
router.get("/", verifyUser, async (req, res) => {
  try {
    const list = await Watchlist.find({
      userId: req.user
    });

    res.json(list);

  } catch (error) {
    console.error("Fetch Watchlist Error:", error);
    res.status(500).json({
      message: "Server error while fetching watchlist"
    });
  }
});

module.exports = router;