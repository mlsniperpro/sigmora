declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const metadata: {
    slug: string;
    title: string;
    description: string;
    category: 'Retention' | 'Remix' | 'Research';
    publishedAt: string;
    readTime: string;
    keywords: string[];
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
