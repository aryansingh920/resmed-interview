import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import "./chartSetup";

type Series = {
  label: string;
  color: string;
  values: (number | null)[];
  yAxisID?: "y" | "y1";
};
export default function TrendMultiLine({
  labels,
  series,
}: {
  labels: string[];
  series: Series[];
}) {
  const data = useMemo(
    () => ({
      labels,
      datasets: series.map((s) => ({
        label: s.label,
        data: s.values,
        borderColor: s.color,
        backgroundColor: s.color + "33",
        fill: false,
        tension: 0.3,
        pointRadius: 2,
        yAxisID: s.yAxisID ?? "y",
      })),
    }),
    [labels, series]
  );
  const options: any = {
    plugins: { legend: { position: "bottom" } },
    interaction: { mode: "index", intersect: false },
    scales: {
      x: { type: "time" as const, time: { unit: "day" } },
      y: {},
      y1: { position: "right" as const, grid: { drawOnChartArea: false } },
    },
  };
  return (
    <div style={{ height: 360 }}>
      <Line data={data} options={options} />
    </div>
  );
}
