import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);
ChartJS.defaults.font.family =
  "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
