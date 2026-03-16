import { useEffect, useState } from "react";
import { getCryptoPrices } from "../api/crypto";
import { addToWatchlist } from "../api/watchlist";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress
} from "@mui/material";

function CryptoCards() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch crypto data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getCryptoPrices(search);
      setCoins(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Error:", err);
      setLoading(false);
    }
  };

  // Initial load + auto refresh every 10 seconds
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  const handleAddToWatchlist = async (coin) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await addToWatchlist(
        {
          coinId: coin.id,
          coinName: coin.name
        },
        token
      );

      alert("❤️ Added to Watchlist");
    } catch (err) {
      console.log(err);
      alert("Already in watchlist or error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 4,
          gap: 2
        }}
      >
        <TextField
          label="Search Coin (bitcoin, ethereum...)"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 4
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Crypto Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3
        }}
      >
        {!loading && coins.length === 0 && <p>No Coin Found</p>}

        {coins.map((coin) => {

          const isPositive =
            coin.price_change_percentage_24h > 0;

          return (
            <Card
              key={coin.id}
              sx={{
                width: 230,
                borderRadius: 3,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6
                }
              }}
            >
              <CardContent>

                {/* Coin Header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 1
                  }}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{
                      width: "28px",
                      height: "28px"
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {coin.name}
                  </Typography>
                </Box>

                {/* Price */}
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  ${coin.current_price}
                </Typography>

                {/* 24h Change */}
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                    color: isPositive
                      ? "green"
                      : "red"
                  }}
                >
                  {isPositive ? "📈" : "📉"}{" "}
                  {coin.price_change_percentage_24h
                    ? coin.price_change_percentage_24h.toFixed(2)
                    : 0}
                  %
                </Typography>

                {/* Watchlist */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() =>
                    handleAddToWatchlist(coin)
                  }
                >
                  ❤️ Watchlist
                </Button>

              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default CryptoCards;