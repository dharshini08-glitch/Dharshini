export function Skeleton() {
  return (
    <article className="skeleton-card">
      <div className="skeleton-image skeleton-block" />
      <div className="skeleton-body">
        <div className="skeleton-line long skeleton-block" />
        <div className="skeleton-line short skeleton-block" />
        <div className="skeleton-line long skeleton-block" />
      </div>
    </article>
  );
}
