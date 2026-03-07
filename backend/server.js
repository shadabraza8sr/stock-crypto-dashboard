// server.js
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// Routes
const watchlistRoutes = require("./routes/watchlistRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

console.log("authRoutes:", authRoutes);
console.log("cryptoRoutes:", cryptoRoutes);
console.log("watchlistRoutes:", watchlistRoutes);
console.log("portfolioRoutes:", portfolioRoutes);

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

/* ================= HTTP SERVER ================= */

const server = http.createServer(app);

/* ================= SOCKET SETUP ================= */

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("joinSymbol", (symbol) => {
    console.log(`📈 Joined room: ${symbol}`);
    socket.join(symbol);
  });

  socket.on("leaveSymbol", (symbol) => {
    console.log(`🚪 Left room: ${symbol}`);
    socket.leave(symbol);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* ================= START SERVER AFTER DB ================= */

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("✅ Database Connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
  });