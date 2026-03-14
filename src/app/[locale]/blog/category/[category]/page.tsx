import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { getAllBlogCategories, getBlogPostsByCategory } from '@/lib/blog';

type BlogCategoryPageProps = {
  params: Promise<{ category: string }>;
};

function decodeCategorySlug(category: string) {
  const mapping = {
    retention: 'Retention',
    remix: 'Remix',
    research: 'Research',
  } as const;

  return mapping[category as keyof typeof mapping] ?? null;
}

export async function generateStaticParams() {
  return getAllBlogCategories().map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const resolved = decodeCategorySlug(category);

  if (!resolved) {
    return {};
  }

  return {
    title: `${resolved} Articles`,
    description: `Browse Sigmora blog posts in the ${resolved.toLowerCase()} category.`,
    alternates: {
      canonical: `/blog/category/${category}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category } = await params;
  const resolved = decodeCategorySlug(category);

  if (!resolved) {
    notFound();
  }

  const posts = getBlogPostsByCategory(resolved);

  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <section className="section-block" style={{ paddingTop: '7rem', maxWidth: '900px' }}>
        <Link href="/blog" className="inline-link" style={{ width: 'fit-content' }}>Back to blog</Link>
        <p className="eyebrow">Category</p>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.8rem)' }}>{resolved} articles</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem', maxWidth: '760px' }}>
          Articles related to {resolved.toLowerCase()} workflows and decisions for short-form teams.
        </p>
      </section>

      <section className="section-block">
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="panel module-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <p className="eyebrow">{post.category}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {post.publishedAt} · {post.readTime}
                </p>
              </div>
              <h2 style={{ fontSize: '1.7rem', color: 'var(--text-primary)' }}>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
