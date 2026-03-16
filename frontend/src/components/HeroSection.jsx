import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        color: "white"
      }}
    >
      <Typography variant="h2" fontWeight="bold">
        Stock & Crypto Dashboard
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Track cryptocurrency prices and manage your portfolio in real time.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Box>

    </Box>
  );
};

export default HeroSection;