import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const features = [
  {
    title: "Real-Time Prices",
    desc: "Track live cryptocurrency prices with market updates.",
  },
  {
    title: "Portfolio Tracking",
    desc: "Manage your assets and monitor total portfolio value.",
  },
  {
    title: "Watchlist",
    desc: "Save your favorite cryptocurrencies and monitor them.",
  },
  {
    title: "Analytics",
    desc: "Visual charts to analyze market trends and performance.",
  },
];

const FeatureSection = () => {
  return (
    <Grid container spacing={4} sx={{ p: 6 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Card
            sx={{
              height: "100%",
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {feature.title}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                {feature.desc}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeatureSection;