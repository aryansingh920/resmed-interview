import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import "./chartSetup";

export default function WeeklyComboChart({
  labels,
  steps,
  calories,
  onBarClick,
}: {
  labels: string[];
  steps: (number | null)[];
  calories: number[];
  onBarClick?: (index: number) => void;
}) {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Steps",
          data: steps,
          backgroundColor: "#5B9DF9",
          borderRadius: 6,
        },
        {
          type: "line" as const,
          label: "Calories",
          data: calories,
          borderColor: "#7DE2D1",
          tension: 0.3,
          yAxisID: "y1",
        },
      ],
    }),
    [labels, steps, calories]
  );

  const options: any = {
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { type: "time" as const, time: { unit: "day" } },
      y: { title: { display: true, text: "Steps" } },
      y1: {
        position: "right" as const,
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Calories" },
      },
    },
    onClick: (_: any, el: any[]) => {
      if (el?.length && onBarClick) onBarClick(el[0].index);
    },
  };
  return (
    <div style={{ height: 320 }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
