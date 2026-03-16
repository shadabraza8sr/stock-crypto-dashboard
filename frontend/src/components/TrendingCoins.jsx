import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

function TrendingCoins() {
  const [coins, setCoins] = useState([]);

  const fetchTrending = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );

      setCoins(res.data.coins);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        🔥 Trending Cryptocurrencies
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap"
        }}
      >
        {coins.map((coin) => (
          <Card key={coin.item.id} sx={{ width: 200 }}>
            <CardContent>

              <img
                src={coin.item.small}
                width="30"
              />

              <Typography variant="h6">
                {coin.item.name}
              </Typography>

              <Typography>
                Rank: {coin.item.market_cap_rank}
              </Typography>

            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default TrendingCoins;