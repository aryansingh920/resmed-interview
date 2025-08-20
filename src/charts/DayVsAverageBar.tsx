import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import "./chartSetup";

export default function DayVsAverageBar({
  label,
  day,
  avgValue,
  color = "#5B9DF9",
}: {
  label: string;
  day: number;
  avgValue: number;
  color?: string;
}) {
  const data = useMemo(
    () => ({
      labels: [label, "7d avg"],
      datasets: [
        {
          data: [day, avgValue],
          backgroundColor: [color, "#A3BFFA"],
          borderRadius: 8,
        },
      ],
    }),
    [label, day, avgValue, color]
  );
  const options = {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
  return (
    <div style={{ height: 240 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
