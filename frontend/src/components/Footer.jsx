import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#0f2027",
        color: "white",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h6">
        Stock & Crypto Dashboard
      </Typography>

      <Typography sx={{ mt: 1 }}>
        Built with React, Node.js and MongoDB
      </Typography>

      <Typography sx={{ mt: 1 }}>
        © 2026 Shadab Raza
      </Typography>
    </Box>
  );
};

export default Footer;