import React from 'react';
type Props = { label: string; value: string; delta?: number; sparkline?: React.ReactNode };
export default function StatCard({ label, value, delta, sparkline }: Props){
  const color = delta == null ? '' : delta >= 0 ? 'pos' : 'neg';
  return (
    <div className="stat">
      <div className="stat-top">
        <div className="stat-value">{value}</div>
        {delta != null && Number.isFinite(delta) && (
          <span className={`delta ${color}`}>{delta>=0?'▲':'▼'} {Math.abs(delta).toFixed(0)}%</span>
        )}
      </div>
      <div className="stat-bottom">
        <span className="stat-label">{label}</span>
        {sparkline}
      </div>
    </div>
  );
}
