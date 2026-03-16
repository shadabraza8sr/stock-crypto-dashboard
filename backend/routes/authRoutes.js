// routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// ✅ Test Route (ADD THIS)
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth route working 🚀"
  });
});

// Existing routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;