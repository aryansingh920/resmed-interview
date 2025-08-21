import React, { useMemo, useState, useEffect } from "react";
import { useApp } from "../hooks/useApp";
import MetricInput from "../components/MetricInput";
import ChartCard from "../components/ChartCard";
import DayVsAverageBar from "../charts/DayVsAverageBar";
import { sliceByRange } from "../utils/dates";
import { average } from "../utils/stats";
import { parseISO, format } from "date-fns";

export default function DailyLog() {
  const { data, setData, selectedDate, setSelectedDate } = useApp();
  const [noteValue, setNoteValue] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const current = useMemo(() => {
    if (selectedDate)
      return data.find((d) => d.date === selectedDate) ?? data[data.length - 1];
    return data[data.length - 1];
  }, [data, selectedDate]);

  // Update local note state when current day changes
  useEffect(() => {
    setNoteValue(current.note ?? "");
    setHasUnsavedChanges(false);
  }, [current.date, current.note]);

  const idx = data.findIndex((d) => d.date === current.date);
  const prevIso = data[Math.max(0, idx - 1)]?.date ?? null;
  const nextIso = data[Math.min(data.length - 1, idx + 1)]?.date ?? null;

  const rows = useMemo(() => sliceByRange(data, "7D"), [data]);
  const avgSteps = average(rows.map((r) => r.steps));
  const avgCalories = average(rows.map((r) => r.calories));
  const avgDuration = average(rows.map((r) => r.durationMinutes));

  const update = (patch: Partial<typeof current>) => {
    setData((prev) =>
      prev.map((d) => (d.date === current.date ? { ...d, ...patch } : d))
    );
  };

  const handleNoteChange = (value: string) => {
    setNoteValue(value);
    setHasUnsavedChanges(value !== (current.note ?? ""));
  };

  const saveNote = () => {
    update({ note: noteValue });
    setHasUnsavedChanges(false);
  };

  const discardChanges = () => {
    setNoteValue(current.note ?? "");
    setHasUnsavedChanges(false);
  };

  return (
    <div className="page">
      <div className="log-h">
        <button disabled={!prevIso} onClick={() => setSelectedDate(prevIso)}>
          ←
        </button>
        <h2>{format(parseISO(current.date), "EEEE, MMM d")}</h2>
        <button disabled={!nextIso} onClick={() => setSelectedDate(nextIso)}>
          →
        </button>
      </div>

      <div className="grid3">
        <MetricInput
          label="Steps"
          value={current.steps}
          onChange={(v) => update({ steps: v })}
        />
        <MetricInput
          label="Calories"
          value={current.calories}
          onChange={(v) => update({ calories: v ?? 0 })}
        />
        <MetricInput
          label="Duration (min)"
          value={current.durationMinutes}
          onChange={(v) => update({ durationMinutes: v ?? 0 })}
        />
      </div>

      <div className="grid3">
        <ChartCard title="Steps vs 7-day average">
          <DayVsAverageBar
            label="today"
            day={current.steps ?? 0}
            avgValue={avgSteps || 0}
          />
        </ChartCard>
        <ChartCard title="Calories vs 7-day average">
          <DayVsAverageBar
            label="today"
            day={current.calories}
            avgValue={avgCalories || 0}
          />
        </ChartCard>
        <ChartCard title="Duration vs 7-day average">
          <DayVsAverageBar
            label="today"
            day={current.durationMinutes}
            avgValue={avgDuration || 0}
          />
        </ChartCard>
      </div>

      <div className="notes">
        <label className="input">
          <span>Notes</span>
          <textarea
            placeholder="e.g., Long walk at lunch"
            value={noteValue}
            onChange={(e) => handleNoteChange(e.currentTarget.value)}
            rows={3}
          />
        </label>

        {hasUnsavedChanges && (
          <div className="note-actions">
            <button onClick={saveNote} className="save-btn">
              Save Note
            </button>
            <button onClick={discardChanges} className="discard-btn">
              Discard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
