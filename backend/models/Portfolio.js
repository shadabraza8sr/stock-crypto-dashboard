// models/Portfolio.js
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assetType: { type: String, enum: ["stock", "crypto"], required: true },
    symbol: { type: String, required: true, uppercase: true },
    quantity: { type: Number, required: true, min: 0 },
    buyPrice: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;