import type { ComponentType } from 'react';
import RetentionPost, { metadata as retentionMetadata } from '@/content/blog/how-to-analyze-short-form-video-retention.mdx';
import RemixPost, { metadata as remixMetadata } from '@/content/blog/reference-first-ai-video-remixing.mdx';
import DatabasePost, { metadata as databaseMetadata } from '@/content/blog/how-to-use-a-viral-video-database.mdx';
import HookPost, { metadata as hookMetadata } from '@/content/blog/how-to-write-better-hooks-for-short-form-video.mdx';
import UGCPost, { metadata as ugcMetadata } from '@/content/blog/what-makes-ugc-ads-retain-attention.mdx';

export type BlogPostMetadata = {
  slug: string;
  title: string;
  description: string;
  category: 'Retention' | 'Remix' | 'Research';
  publishedAt: string;
  readTime: string;
  keywords: string[];
};

export type BlogPost = BlogPostMetadata & {
  Component: ComponentType;
};

const blogPosts: BlogPost[] = [
  { ...retentionMetadata, Component: RetentionPost },
  { ...remixMetadata, Component: RemixPost },
  { ...databaseMetadata, Component: DatabasePost },
  { ...hookMetadata, Component: HookPost },
  { ...ugcMetadata, Component: UGCPost },
];

export function getAllBlogCategories() {
  return [...new Set(blogPosts.map((post) => post.category))];
}

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getBlogPostsByCategory(category: BlogPostMetadata['category']) {
  return getAllBlogPosts().filter((post) => post.category === category);
}
