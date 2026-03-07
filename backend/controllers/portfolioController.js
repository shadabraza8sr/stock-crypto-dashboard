// controllers/portfolioController.js
const Portfolio = require("../models/Portfolio");

// Add asset
const addAsset = async (req, res) => {
  try {
    const { assetType, symbol, quantity, buyPrice } = req.body;

    const newAsset = new Portfolio({
      userId: req.user.id,
      assetType,
      symbol,
      quantity,
      buyPrice,
    });

    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get portfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user.id });
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete asset
const deleteAsset = async (req, res) => {
  try {
    const deleted = await Portfolio.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Asset not found" });

    res.status(200).json({ message: "Asset deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addAsset, getPortfolio, deleteAsset };