// src/charts/chartSetup.tsx

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

// Import the adapter only if we're not in a test environment
if (typeof window !== "undefined" && !process.env.JEST_WORKER_ID) {
  import("chartjs-adapter-date-fns").catch(console.error);
}

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
