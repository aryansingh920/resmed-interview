export default function EmptyState({
  message = "No data found",
  action,
}: {
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty">
      <p>{message}</p>
      {action}
    </div>
  );
}
