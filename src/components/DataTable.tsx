import React from "react";
import type { Day } from "../context/AppProvider";
type Props = { rows: Day[]; onSelect?: (iso: string) => void };
export default function DataTable({ rows, onSelect }: Props) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>Calories</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.date} onClick={() => onSelect?.(r.date)} className="row">
              <td>{r.date}</td>
              <td>{r.steps ?? "—"}</td>
              <td>{r.calories}</td>
              <td>{r.durationMinutes}m</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
