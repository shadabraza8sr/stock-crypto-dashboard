import { useEffect, useState } from "react";
import { getCryptoPrices } from "../api/crypto";
import { addToWatchlist } from "../api/watchlist";

function CryptoCards() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Get token
  const token = localStorage.getItem("token");

  // ✅ Fetch crypto data
  const fetchData = async () => {
    try {
      const res = await getCryptoPrices(search);
      setCoins(res.data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  // ✅ Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Search button
  const handleSearch = () => {
    fetchData();
  };

  // ✅ Add to Watchlist
  const handleAddToWatchlist = async (coin) => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await addToWatchlist(
        {
          coinId: coin.id,
          coinName: coin.name,
        },
        token
      );

      alert("❤️ Added to Watchlist");
    } catch (err) {
      console.log("Watchlist Error:", err.response?.data || err.message);
      alert("Already in watchlist or error");
    }
  };

  return (
    <div>
      {/* 🔍 SEARCH BAR */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter coin id (bitcoin, ethereum, solana)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
          }}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 📊 COIN CARDS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {coins.length === 0 && <p>No Coin Found</p>}

        {coins.map((coin) => (
          <div
            key={coin.id}
            style={{
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "220px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{coin.name}</h3>

            <p>💰 Price: ${coin.current_price}</p>

            <p>
              📈 24h:{" "}
              {coin.price_change_percentage_24h
                ? coin.price_change_percentage_24h.toFixed(2)
                : 0}
              %
            </p>

            {/* ❤️ Add To Watchlist */}
            <button
              onClick={() => handleAddToWatchlist(coin)}
              style={{
                marginTop: "10px",
                padding: "6px 10px",
                cursor: "pointer",
              }}
            >
              ❤️ Add To Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoCards;