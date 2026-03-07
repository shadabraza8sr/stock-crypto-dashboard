import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function PriceChart({ coinId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: 7,
            },
          }
        );

        const formatted = res.data.prices.map((item) => ({
          time: new Date(item[0]).toLocaleDateString(),
          price: item[1],
        }));

        setData(formatted);
      } catch (err) {
        console.log(err);
      }
    };

    if (coinId) fetchHistory();
  }, [coinId]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;