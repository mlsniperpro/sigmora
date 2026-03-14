import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

const resources = [
  {
    href: '/blog',
    title: 'Read the Sigmora blog',
    description: 'Indexable articles covering retention analysis, remix workflows, and viral research operations.',
    category: 'Blog',
  },
  {
    href: '/retention-analysis',
    title: 'What video retention analysis should actually help you decide',
    description: 'A practical view of hook, pacing, proof, and CTA analysis for short-form teams.',
    category: 'Guide',
  },
  {
    href: '/video-remixer',
    title: 'How to use an AI video remixer without generating generic content',
    description: 'Why reference-first remixing is more useful than blank-prompt generation for operators.',
    category: 'Workflow',
  },
  {
    href: '/viral-database',
    title: 'How to use a viral video database as a production input',
    description: 'Move from inspiration to analysis to execution without losing momentum.',
    category: 'Research',
  },
] as const;

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Read Sigmora resources on retention analysis, AI video remixing, and viral video research for short-form teams.',
  alternates: {
    canonical: '/resources',
  },
};

export default function ResourcesPage() {
  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <section className="section-block" style={{ paddingTop: '7rem', maxWidth: '900px' }}>
        <p className="eyebrow">Resources</p>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}>Resources for short-form growth teams</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem', maxWidth: '740px' }}>
          Public guides and landing pages explaining how Sigmora approaches retention analysis, remixing, and viral content research.
        </p>
      </section>

      <section className="section-block">
        <div className="module-grid">
          {resources.map((resource) => (
            <Link key={resource.href} href={resource.href} className="panel module-card" style={{ textDecoration: 'none' }}>
              <p className="eyebrow">{resource.category}</p>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{resource.title}</h2>
              <p>{resource.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
