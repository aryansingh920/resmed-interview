import React from "react";
type Props = {
  title: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
};
export default function ChartCard({ title, toolbar, children }: Props) {
  return (
    <section className="card">
      <header className="card-h">
        <h3>{title}</h3>
        <div className="grow" />
        {toolbar}
      </header>
      <div className="card-b">{children}</div>
    </section>
  );
}
