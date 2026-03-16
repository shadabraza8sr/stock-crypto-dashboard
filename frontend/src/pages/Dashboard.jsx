import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import { getWatchlist, deleteWatchlistItem } from "../api/watchlist";
import { useNavigate } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import socket from "../socket"; // ✅ Socket connection

function Dashboard() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [livePrices, setLivePrices] = useState({}); // ✅ Store live prices
  const [newCoinId, setNewCoinId] = useState("bitcoin"); // Temp input
  const [newCoinName, setNewCoinName] = useState("Bitcoin");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= PROFILE ================= */
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token]);

  /* ================= WATCHLIST ================= */
  const fetchWatchlist = async () => {
    try {
      const res = await getWatchlist(token);
      setWatchlist(res.data);
    } catch (err) {
      console.log("Watchlist Error:", err);
    }
  };

  useEffect(() => {
    if (token) fetchWatchlist();
  }, [token]);

  /* ================= SOCKET REAL TIME ================= */
  useEffect(() => {
    if (!watchlist.length) return;

    // ✅ Join rooms for each coin
    watchlist.forEach((item) => socket.emit("joinSymbol", item.coinId));

    // ✅ Listen for live updates
    socket.on("priceUpdate", (data) => {
      setLivePrices((prev) => ({
        ...prev,
        [data.symbol]: data.price,
      }));
    });

    // ✅ Cleanup
    return () => {
      watchlist.forEach((item) => socket.emit("leaveSymbol", item.coinId));
      socket.off("priceUpdate");
    };
  }, [watchlist]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ================= REMOVE COIN ================= */
  const handleRemove = async (id) => {
    try {
      await deleteWatchlistItem(id, token);
      fetchWatchlist();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= ADD COIN TEMP ================= */
  const handleAddCoin = async () => {
    if (!token) return alert("No token found!");
    try {
      const res = await fetch("http://localhost:5000/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coinId: newCoinId.toLowerCase(),
          coinName: newCoinName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Coin added!");
        fetchWatchlist(); // ✅ Refresh watchlist immediately
      } else {
        alert("❌ Failed: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("❌ Error adding coin");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container">
      {/* 🔥 Profile Card */}
      <div className="card">
        <h2>🚀 Welcome {user?.email}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* ➕ Temporary Add Coin */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h2>➕ Add Coin (Temp)</h2>
        <input
          type="text"
          placeholder="Coin ID (e.g. bitcoin)"
          value={newCoinId}
          onChange={(e) => setNewCoinId(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Coin Name (e.g. Bitcoin)"
          value={newCoinName}
          onChange={(e) => setNewCoinName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button
          style={{ background: "green", color: "white", padding: "8px 12px" }}
          onClick={handleAddCoin}
        >
          Add Coin
        </button>
      </div>

      {/* ❤️ Watchlist */}
      <div className="card" style={{ marginTop: "30px" }}>
        <h2>❤️ Your Watchlist</h2>
        {watchlist.length === 0 && <p>No coins added yet.</p>}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {watchlist.map((item) => (
            <div key={item._id} className="card" style={{ width: "220px" }}>
              <h3>{item.coinName}</h3>

              {/* 🔥 Live Price */}
              <p>
                💰 Price: $
                {livePrices[item.coinId] !== undefined
                  ? livePrices[item.coinId]
                  : "Loading..."}
              </p>

              <button
                style={{ background: "red" }}
                onClick={() => handleRemove(item._id)}
              >
                🗑 Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 Chart Section */}
      {watchlist.length > 0 && (
        <div className="card" style={{ marginTop: "30px" }}>
          <h2>📊 Price Chart</h2>
          <PriceChart coinId={watchlist[0]?.coinId} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;