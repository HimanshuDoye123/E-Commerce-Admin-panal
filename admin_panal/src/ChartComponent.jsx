import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement,ArcElement, Tooltip, Legend);

export default function ChartComponent({ products }) {
  const data = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Total Price",
        data: products.map((p) => p.total),
        backgroundColor:[
          '#d39da9',
          '#78b4dc',
          '#dfcb98'
        ]
      },
    ],
  };

  return <> <Bar data={data} /> 
  <div style={{width:"300px", marginTop:"20px",alignContent:"center", display:"flex", justifyContent:"center",alignItems:'center'}} > <Doughnut data={data} /></div></>;
}