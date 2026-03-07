import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#111827" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          🚀 Crypto Dashboard
        </Typography>

        <Button color="inherit" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;