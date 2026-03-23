import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h3 className="logo">Admin Panel</h3>

      <div className="nav-links">
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/users")}>
          User Management
        </button>

        <button onClick={() => navigate("/products")}>
          Product Management
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}