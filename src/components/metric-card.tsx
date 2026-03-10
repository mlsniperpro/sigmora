type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
};

// Map labels to premium colors matching the landing page stats grid
const getMetricColor = (label: string) => {
  const map: Record<string, string> = {
    'Workspace': '#fff',
    'Ready assets': '#d66428', // accent
    'Benchmarks': '#37b5ae',  // teal
    'Viral Database': '#37b5ae',
    'Live jobs': '#ea8551',    // light orange
    'Rising trends': '#188a84', // dark teal
    'Competitors': '#fff',
    'Prompts': '#ea8551',
    'Remix jobs': '#37b5ae',
    'Velocity': '#d66428',
    'Momentum': '#37b5ae',
    'Risk level': '#ea8551',
    'Engagement': '#188a84',
    'Originality': '#d66428',
    'Revenue': '#37b5ae'
  };
  return map[label] || '#fff';
};

export function MetricCard({ label, value, detail }: MetricCardProps) {
  const color = getMetricColor(label);

  return (
    <article className="panel module-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
      <p className="metric-label" style={{ marginBottom: '1rem' }}>{label}</p>
      <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color, marginBottom: '0.4rem', lineHeight: 1 }}>{value}</h2>
      <p style={{ fontSize: '0.85rem' }}>{detail}</p>
    </article>
  );
}
