import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "../charts/chartSetup";

export default function Sparkline({
  labels,
  values,
  color = "#5B9DF9",
}: {
  labels: string[];
  values: (number | null)[];
  color?: string;
}) {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: values,
          borderColor: color,
          backgroundColor: color + "33",
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    }),
    [labels, values, color]
  );
  const options = useMemo(
    () => ({
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
    }),
    []
  );
  return (
    <div style={{ height: 36 }}>
      <Line data={data} options={options} />
    </div>
  );
}
