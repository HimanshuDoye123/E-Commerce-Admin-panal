import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = ()=> {
    logout();
    navigate("/")
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Dashboard</h2>
      <p>Welcome {user?.firstName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}