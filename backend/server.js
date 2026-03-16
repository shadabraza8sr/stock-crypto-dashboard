// server.js
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const axios = require("axios");

// ===== DB =====
const connectDB = require("./config/db");

// ===== Routes =====
const watchlistRoutes = require("./routes/watchlistRoutes");
const authRoutes = require("./routes/authRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/crypto", cryptoRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/portfolio", portfolioRoutes);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("🚀 Stock Crypto API Running");
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

/* ================= HTTP SERVER ================= */
const server = http.createServer(app);

/* ================= SOCKET.IO SETUP ================= */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("joinSymbol", (symbol) => {
    console.log("📈 Joined room:", symbol);
    socket.join(symbol);
  });

  socket.on("leaveSymbol", (symbol) => {
    console.log("🚪 Left room:", symbol);
    socket.leave(symbol);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* ================= REAL-TIME PRICE FETCHER ================= */

// Supported coins: CoinGecko IDs
const symbols = ["bitcoin", "ethereum", "dogecoin"];
const symbolMap = { bitcoin: "BTC", ethereum: "ETH", dogecoin: "DOGE" };

// Store last prices to avoid unnecessary broadcasts
const lastPrices = {};

// Fetch multiple coins in **one API call**
async function fetchPrices() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: symbols.join(","),
          vs_currencies: "usd",
        },
      }
    );

    const prices = response.data; // { bitcoin: { usd: 67185 }, ethereum: { usd: 1800 }, ... }

    // Broadcast only if price changed
    for (const symbol of symbols) {
      const price = prices[symbol].usd;
      if (price !== lastPrices[symbol]) {
        lastPrices[symbol] = price;

        console.log(`📢 Broadcasting ${symbolMap[symbol]} Price: ${price}`);

        // Emit to users in this symbol's room
        io.to(symbolMap[symbol]).emit("priceUpdate", {
          symbol: symbolMap[symbol],
          price,
          timestamp: Date.now(),
        });
      }
    }
  } catch (err) {
    console.error("❌ Price Fetch Error:", err.message);
  }
}

// Fetch every 30 seconds to respect CoinGecko free tier
setInterval(fetchPrices, 30000);

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to Start Server:", err);
    process.exit(1);
  }
}

startServer();