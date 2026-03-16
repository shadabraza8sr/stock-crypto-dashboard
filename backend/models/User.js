const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  watchlist: {
    type: [String],
    default: [],
  },

  // email verification status
  isVerified: {
    type: Boolean,
    default: false,
  },

  // OTP for verification
  otp: {
    type: String,
  },

  // OTP expiry time
  otpExpiry: {
    type: Date,
  }

},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;