import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useDashboardData } from "./useDashboardData";
import StatsCard from "./StatsCard";
import ChartComponent from "./ChartComponent";
import "./Dashboard.css";
import Navbar from "./Navbar";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const { totalPrice, totalQuantity, totalDiscounted, products } =
    useDashboardData(user?.id);


  return (
    <div className="dashboard-container">
      <Navbar />

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
