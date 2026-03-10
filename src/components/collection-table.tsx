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
    <section className="panel table-panel">
      <div className="table-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="data-table">
        <div className="data-table-row data-table-head">
          {columns.map((column) => (
            <span key={column.key}>{column.header}</span>
          ))}
        </div>

        {items.map((item, index) => (
          <div key={index} className="data-table-row">
            {columns.map((column) => (
              <span key={column.key}>{column.render(item)}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
