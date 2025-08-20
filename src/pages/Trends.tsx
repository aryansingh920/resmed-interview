import React, { useMemo, useState } from "react";
import { useApp } from "../hooks/useApp";
import TrendMultiLine from "../charts/TrendMultiLine";
import ChartCard from "../components/ChartCard";
import { sliceByRange } from "../utils/dates";
import { movingAverage } from "../utils/stats";

export default function Trends() {
  const { data, range } = useApp();
  const [showSteps, setShowSteps] = useState(true);
  const [showCalories, setShowCalories] = useState(true);
  const [showDuration, setShowDuration] = useState(false);
  const [smooth, setSmooth] = useState(0); // 0|3|7

  const rows = useMemo(() => sliceByRange(data, range), [data, range]);
  const labels = rows.map((r) => r.date);
  const steps = rows.map((r) => r.steps ?? null);
  const calories = rows.map((r) => r.calories ?? null);
  const duration = rows.map((r) => r.durationMinutes ?? null);

  const smoothIf = (arr: (number | null)[]) => {
    if (!smooth) return arr;
    const nums = arr.map((v) => v ?? 0);
    const mv = movingAverage(nums, smooth);
    return mv.map((v) => (Number.isNaN(v) ? null : v));
  };

  const series = [
    showSteps && { label: "Steps", color: "#5B9DF9", values: smoothIf(steps) },
    showCalories && {
      label: "Calories",
      color: "#7DE2D1",
      values: smoothIf(calories),
      yAxisID: "y1" as const,
    },
    showDuration && {
      label: "Duration",
      color: "#FFA07A",
      values: smoothIf(duration),
    },
  ].filter(Boolean) as {
    label: string;
    color: string;
    values: (number | null)[];
    yAxisID?: "y" | "y1";
  }[];

  const toolbar = (
    <div className="toolbar">
      <label>
        <input
          type="checkbox"
          checked={showSteps}
          onChange={(e) => setShowSteps(e.target.checked)}
        />{" "}
        Steps
      </label>
      <label>
        <input
          type="checkbox"
          checked={showCalories}
          onChange={(e) => setShowCalories(e.target.checked)}
        />{" "}
        Calories
      </label>
      <label>
        <input
          type="checkbox"
          checked={showDuration}
          onChange={(e) => setShowDuration(e.target.checked)}
        />{" "}
        Duration
      </label>
      <span className="sep" />
      <label>
        Smoothing
        <select
          value={smooth}
          onChange={(e) => setSmooth(Number(e.target.value))}
        >
          <option value={0}>Off</option>
          <option value={3}>3-pt</option>
          <option value={7}>7-pt</option>
        </select>
      </label>
    </div>
  );

  return (
    <div className="page">
      <ChartCard title="Trends" toolbar={toolbar}>
        <TrendMultiLine labels={labels} series={series} />
      </ChartCard>
    </div>
  );
}
