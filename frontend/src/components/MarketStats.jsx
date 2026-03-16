import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function MarketStats() {

  const [data, setData] = useState(null);

  const fetchMarket = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/global"
    );

    setData(res.data.data);
  };

  useEffect(() => {
    fetchMarket();
  }, []);

  if (!data) return null;

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        background: "#111",
        color: "white"
      }}
    >
      <Typography variant="h5">
        🌍 Global Crypto Market
      </Typography>

      <Typography>
        Market Cap: $
        {Math.round(data.total_market_cap.usd / 1e9)}B
      </Typography>

      <Typography>
        BTC Dominance: {data.market_cap_percentage.btc.toFixed(2)}%
      </Typography>

    </Box>
  );
}

export default MarketStats;