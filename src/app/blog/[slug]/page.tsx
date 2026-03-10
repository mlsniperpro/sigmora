import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { getAllBlogPosts, getBlogPostBySlug, getBlogPostsByCategory } from '@/lib/blog';
import { siteUrl } from '@/lib/marketing-content';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Sigmora`,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Sigmora`,
      description: post.description,
      images: ['/twitter-image'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Sigmora',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sigmora',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };
  const relatedPosts = getBlogPostsByCategory(post.category)
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="sigmora-shell" style={{ paddingBottom: '6rem' }}>
      <Navbar />
      <Script
        id={`article-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="section-block" style={{ paddingTop: '7rem', maxWidth: '820px' }}>
        <Link href="/blog" className="inline-link" style={{ width: 'fit-content' }}>
          Back to blog
        </Link>
        <p className="eyebrow">{post.category}</p>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>{post.title}</h1>
        <p className="hero-summary" style={{ fontSize: '1.15rem' }}>{post.description}</p>
        <p style={{ fontSize: '0.9rem', color: 'rgba(245, 241, 232, 0.52)' }}>
          {post.publishedAt} · {post.readTime}
        </p>
        <Link href={`/blog/category/${post.category.toLowerCase()}`} className="inline-link" style={{ width: 'fit-content' }}>
          More {post.category.toLowerCase()} articles
        </Link>

        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          <post.Component />
        </div>

        {relatedPosts.length > 0 ? (
          <section style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.6rem' }}>Related articles</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="panel module-card" style={{ textDecoration: 'none' }}>
                  <p className="eyebrow">{relatedPost.category}</p>
                  <h3 style={{ fontSize: '1.35rem', color: '#fff' }}>{relatedPost.title}</h3>
                  <p>{relatedPost.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
