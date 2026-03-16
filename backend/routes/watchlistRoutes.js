const express = require("express");
const Watchlist = require("../models/Watchlist");
const { verifyUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Add to watchlist
router.post("/", verifyUser, async (req, res) => {
  try {
    const { coinId, coinName } = req.body;

    // ✅ Check if coin already exists
    const exists = await Watchlist.findOne({
      user: req.user.id,
      coinId,
    });
    if (exists) {
      return res.status(400).json({ message: "Coin already exists" });
    }

    const newItem = await Watchlist.create({
      user: req.user.id, // ✅ Use id
      coinId,
      coinName,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get watchlist
router.get("/", verifyUser, async (req, res) => {
  try {
    const list = await Watchlist.find({ user: req.user.id }); // ✅ Use id
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a coin
router.delete("/:id", verifyUser, async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;