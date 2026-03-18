import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ChartComponent({ products }) {
  const data = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Total Price",
        data: products.map((p) => p.total),
      },
    ],
  };

  return <Bar data={data} />;
}