import { useEffect, useState } from "react";
import { getPortfolio, deleteAsset } from "../api/portfolio";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material";

function Portfolio() {

  const [assets, setAssets] = useState([]);

  const token = localStorage.getItem("token");

  const fetchPortfolio = async () => {
    try {
      const res = await getPortfolio(token);
      setAssets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAsset(id, token);
      fetchPortfolio();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        📊 My Portfolio
      </Typography>

      {assets.length === 0 && (
        <Typography>
          No assets in portfolio
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >

        {assets.map((asset) => (

          <Card
            key={asset._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2
            }}
          >

            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3
              }}
            >

              {/* Coin Name */}
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                {asset.coinName}
              </Typography>

              {/* Quantity */}
              <Typography>
                Qty: {asset.quantity}
              </Typography>

              {/* Price */}
              <Typography>
                Price: ${asset.price}
              </Typography>

            </CardContent>

            {/* Remove Button */}
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleDelete(asset._id)
              }
            >
              Remove
            </Button>

          </Card>

        ))}

      </Box>

    </Box>
  );
}

export default Portfolio;