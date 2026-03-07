import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import {
  getWatchlist,
  deleteWatchlistItem,
} from "../api/watchlist";
import { useNavigate } from "react-router-dom";
import PriceChart from "../components/PriceChart";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Fetch User
  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token]);

  // ✅ Fetch Watchlist
  const fetchWatchlist = async () => {
    try {
      const res = await getWatchlist(token);
      setWatchlist(res.data);
    } catch (err) {
      console.log("Watchlist Error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchWatchlist();
    }
  }, [token]);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Remove Coin
  const handleRemove = async (id) => {
    try {
      await deleteWatchlistItem(id, token);
      fetchWatchlist();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">

      {/* 🔥 Profile Card */}
      <div className="card">
        <h2>🚀 Welcome {user?.email}</h2>
        <button onClick={handleLogout}>Logout</button>
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
            <div
              key={item._id}
              className="card"
              style={{ width: "200px" }}
            >
              <h3>{item.coinName}</h3>

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