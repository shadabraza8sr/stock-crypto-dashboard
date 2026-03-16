import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function MarketOverview() {
  const [coins, setCoins] = useState([]);

  const fetchMarketData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1
          }
        }
      );

      setCoins(res.data);
    } catch (err) {
      console.log("Market API Error:", err);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <Box sx={{ padding: "40px" }}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Top Cryptocurrencies
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h Change</TableCell>
              <TableCell>Market Cap</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width="25"
                    style={{ marginRight: "10px" }}
                  />
                  {coin.name}
                </TableCell>

                <TableCell>${coin.current_price}</TableCell>

                <TableCell
                  style={{
                    color:
                      coin.price_change_percentage_24h > 0
                        ? "green"
                        : "red"
                  }}
                >
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </TableCell>

                <TableCell>
                  ${coin.market_cap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default MarketOverview;