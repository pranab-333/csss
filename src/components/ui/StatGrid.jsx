export default function StatGrid({ stats }) {
  return (
    <section className="stat-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-card__value">{stat.value}</div>
          <div className="stat-card__label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
