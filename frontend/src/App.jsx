import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ Navbar Outside Routes So It Shows Everywhere */}
      <Navbar />

      <Routes>

        {/* ✅ Login */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Register */}
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;