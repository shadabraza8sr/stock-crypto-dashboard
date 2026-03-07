import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });

      console.log("Login Success:", res.data);

      // ✅ Store token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "350px", margin: "auto" }}>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;