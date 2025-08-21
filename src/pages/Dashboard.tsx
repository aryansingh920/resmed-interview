import React, { useMemo } from "react";
import { useApp } from "../hooks/useApp";
import StatCard from "../components/StatCard";
import Sparkline from "../charts/Sparkline";
import ChartCard from "../components/ChartCard";
import WeeklyComboChart from "../charts/WeeklyComboChart";
import { sliceByRange } from "../utils/dates";
import { average } from "../utils/stats";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { data, range, setSelectedDate } = useApp();
  const nav = useNavigate();
  const rows = useMemo(() => sliceByRange(data, range), [data, range]);

  const labels = rows.map((r) => r.date);
  const steps = rows.map((r) => r.steps ?? null);
  const calories = rows.map((r) => r.calories);
  const duration = rows.map((r) => r.durationMinutes);

  const today = rows[rows.length - 1];
  const avgSteps = average(rows.map((r) => r.steps));
  const deltaSteps =
    today?.steps && avgSteps > 0
      ? ((today.steps - avgSteps) / avgSteps) * 100
      : undefined;

  console.log(data, rows, labels, steps, calories, duration); 
  return (
    <div className="page">
      <div className="grid3">
        <StatCard
          label="Steps (today)"
          value={today?.steps?.toLocaleString() ?? "—"}
          delta={deltaSteps}
          sparkline={<Sparkline labels={labels} values={steps} />}
        />
        <StatCard
          label="Calories (today)"
          value={today?.calories?.toLocaleString() ?? "—"}
          sparkline={<Sparkline labels={labels} values={calories} />}
        />
        <StatCard
          label="Duration (today)"
          value={today ? `${today.durationMinutes}m` : "—"}
          sparkline={<Sparkline labels={labels} values={duration} />}
        />
      </div>

      <ChartCard title="Weekly Overview">
        <WeeklyComboChart
          labels={labels}
          steps={steps}
          calories={calories}
          onBarClick={(i) => {
            const iso = labels[i];
            setSelectedDate(iso);
            nav("/log");
          }}
        />
      </ChartCard>
    </div>
  );
}
