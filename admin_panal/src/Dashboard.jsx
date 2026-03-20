import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useDashboardData } from "./useDashboardData";
import StatsCard from "./StatsCard";
import ChartComponent from "./ChartComponent";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { totalPrice, totalQuantity, totalDiscounted, products } =
    useDashboardData(user?.id);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToUsers = () => {
    navigate("/users");
  };

  return (
    <div className="dashboard-container">
      <div className="top-actions">
        <button className="user-btn" onClick={goToUsers}>
          User Management
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2 className="dashboard-title">Dashboard</h2>
      <p className="welcome-text">Welcome {user?.firstName}</p>

      {/* CARDS */}
      <div className="stats-wrapper">
        <StatsCard title="Total Price" value={totalPrice} />
        <StatsCard title="Total Quantity" value={totalQuantity} />
        <StatsCard title="Discounted Total" value={totalDiscounted} />
      </div>

      {/* CHART */}
      <div className="chart-container">
        <ChartComponent products={products} />
      </div>
    </div>
  );
}
