type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
};

type CollectionTableProps<T> = {
  title: string;
  description: string;
  items: T[];
  columns: Column<T>[];
};

export function CollectionTable<T>({
  title,
  description,
  items,
  columns,
}: CollectionTableProps<T>) {
  return (
    <section className="panel" style={{ padding: '2rem' }}>
      <div className="table-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h2>
          <p style={{ fontSize: '0.95rem' }}>{description}</p>
        </div>
      </div>

      <div className="data-table">
        <div className="data-table-row data-table-head" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
          {columns.map((column) => (
            <span key={column.key} style={{ color: 'rgba(245, 241, 232, 0.5)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{column.header}</span>
          ))}
        </div>

        {items.map((item, index) => (
          <div key={index} className="data-table-row" style={{
            transition: 'background 0.2s',
            margin: '0 -1rem',
            padding: '1rem',
            borderRadius: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
          }}
          // Basic inline hover effect simulation via global CSS

          >
            {columns.map((column) => (
              <span key={column.key} style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>{column.render(item)}</span>
            ))}
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(245, 241, 232, 0.4)', fontSize: '0.9rem' }}>
            No records found.
          </div>
        )}
      </div>
    </section>
  );
}
