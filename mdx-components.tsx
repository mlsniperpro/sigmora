import type { MDXComponents } from 'mdx/types';

function Callout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gap: '0.5rem',
        padding: '1rem 1.15rem',
        borderRadius: '1rem',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      {title ? <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{title}</strong> : null}
      <div style={{ color: 'rgba(245, 241, 232, 0.82)', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    hr: () => <hr style={{ width: '100%', border: 0, borderTop: '1px solid rgba(255,255,255,0.08)', margin: '0.75rem 0' }} />,
    table: (props) => <table style={{ width: '100%', borderCollapse: 'collapse', color: 'rgba(245, 241, 232, 0.82)' }} {...props} />,
    th: (props) => <th style={{ textAlign: 'left', padding: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.14)' }} {...props} />,
    td: (props) => <td style={{ padding: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }} {...props} />,
    h2: (props) => <h2 style={{ fontSize: '1.7rem', marginTop: '1rem' }} {...props} />,
    h3: (props) => <h3 style={{ fontSize: '1.35rem', marginTop: '0.75rem' }} {...props} />,
    p: (props) => (
      <p
        style={{
          fontSize: '1.02rem',
          lineHeight: 1.75,
          color: 'rgba(245, 241, 232, 0.8)',
        }}
        {...props}
      />
    ),
    a: (props) => <a className="inline-link" {...props} />,
    ul: (props) => <ul style={{ color: 'rgba(245, 241, 232, 0.8)', lineHeight: 1.7, paddingLeft: '1.2rem' }} {...props} />,
    ol: (props) => <ol style={{ color: 'rgba(245, 241, 232, 0.8)', lineHeight: 1.7, paddingLeft: '1.2rem' }} {...props} />,
    li: (props) => <li style={{ marginBottom: '0.45rem' }} {...props} />,
    blockquote: (props) => (
      <blockquote
        style={{
          margin: 0,
          padding: '1rem 1.25rem',
          borderLeft: '3px solid rgba(214, 100, 40, 0.7)',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '0.8rem',
          color: 'rgba(245, 241, 232, 0.86)',
        }}
        {...props}
      />
    ),
    ...components,
  };
}
