import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { getAllBlogCategories, getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read the Sigmora blog for practical guides on short-form video retention analysis, remix workflows, and viral content research.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllBlogCategories();

  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <section className="section-block" style={{ paddingTop: '7rem', maxWidth: '900px' }}>
        <p className="eyebrow">Blog</p>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}>Articles for short-form growth teams</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem', maxWidth: '760px' }}>
          Practical writing on retention analysis, video remixing, and viral content research for creators, marketers, and agencies.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase()}`}
              className="button button-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="panel module-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <p className="eyebrow">{post.category}</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245, 241, 232, 0.52)' }}>
                  {post.publishedAt} · {post.readTime}
                </p>
              </div>
              <h2 style={{ fontSize: '1.7rem', color: '#fff' }}>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
