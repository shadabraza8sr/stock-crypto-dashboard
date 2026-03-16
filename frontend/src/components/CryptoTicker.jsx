import React from "react";
import { Box, Typography } from "@mui/material";

const CryptoTicker = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 6,
        background: "#111",
        color: "white",
        p: 2,
      }}
    >
      <Typography>BTC $67000 ↑</Typography>
      <Typography>ETH $3200 ↑</Typography>
      <Typography>SOL $170 ↑</Typography>
      <Typography>BNB $590 ↑</Typography>
    </Box>
  );
};

export default CryptoTicker;