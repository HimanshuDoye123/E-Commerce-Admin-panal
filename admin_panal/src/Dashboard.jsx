import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useDashboardData } from "./useDashboardData";
import StatsCard from "./StatsCard";
import ChartComponent from "./ChartComponent";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { totalPrice, totalQuantity, totalDiscounted, products } =
    useDashboardData(user?.id);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <p>Welcome {user?.firstName}</p>

      <button onClick={handleLogout}>Logout</button>

      {/* Cards */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <StatsCard title="Total Price" value={totalPrice} />
        <StatsCard title="Total Quantity" value={totalQuantity} />
        <StatsCard title="Discounted Total" value={totalDiscounted} />
      </div>

      {/* Chart */}
      <div style={{ marginTop: "40px" }}>
        <ChartComponent products={products} />
      </div>
    </div>
  );
}