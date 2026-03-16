import React from "react";
import HeroSection from "../components/HeroSection";
import CryptoTicker from "../components/CryptoTicker";
import MarketStats from "../components/MarketStats";
import TrendingCoins from "../components/TrendingCoins";
import CryptoCards from "../components/CryptoCards";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <CryptoTicker />
      <HeroSection />
      <MarketStats />
      <TrendingCoins />
      <CryptoCards />
      <FeatureSection />
      <Footer />
    </>
  );
}

export default LandingPage;