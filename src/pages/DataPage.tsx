import React, { useMemo, useRef, useState } from "react";
import { useApp } from "../hooks/useApp";
import DataTable from "../components/DataTable";
import { sliceByRange } from "../utils/dates";

export default function DataPage() {
  const { data, setData, range, setSelectedDate } = useApp();
  const rows = useMemo(() => sliceByRange(data, range), [data, range]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(rows, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "exerciseData.json";
    a.click();
  };

  const exportCSV = () => {
    const header = "date,steps,calories,durationMinutes\n";
    const body = rows
      .map((r) =>
        [r.date, r.steps ?? "", r.calories, r.durationMinutes].join(",")
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "exerciseData.csv";
    a.click();
  };

  const importJSON = async (file: File) => {
    setError(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array");
      for (const item of parsed) {
        if (
          typeof item.date !== "string" ||
          typeof item.calories !== "number" ||
          typeof item.durationMinutes !== "number"
        ) {
          throw new Error("Invalid schema");
        }
      }
      setData(parsed);
    } catch (e: any) {
      setError(e.message ?? "Import failed");
    }
  };

  return (
    <div className="page">
      <div className="row">
        <button onClick={exportJSON}>Export JSON</button>
        <button onClick={exportCSV}>Export CSV</button>
        <input
          ref={inputRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => {
            const f = e.currentTarget.files?.[0];
            if (f) importJSON(f);
          }}
        />
        <button onClick={() => inputRef.current?.click()}>Import JSON</button>
        {error && <span className="error">{error}</span>}
      </div>

      <DataTable rows={rows} onSelect={(iso) => setSelectedDate(iso)} />
    </div>
  );
}
