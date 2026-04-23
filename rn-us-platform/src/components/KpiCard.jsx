export default function KpiCard({ label, value }) {
  return (
    <article className="card kpi">
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  );
}
