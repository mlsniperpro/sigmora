import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sigmora.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/retention-analysis`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/video-remixer`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/viral-database`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/resources`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog/how-to-analyze-short-form-video-retention`,
            lastModified: new Date('2026-03-10'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/reference-first-ai-video-remixing`,
            lastModified: new Date('2026-03-10'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/how-to-use-a-viral-video-database`,
            lastModified: new Date('2026-03-10'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/how-to-write-better-hooks-for-short-form-video`,
            lastModified: new Date('2026-03-11'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/what-makes-ugc-ads-retain-attention`,
            lastModified: new Date('2026-03-11'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/category/retention`,
            lastModified: new Date('2026-03-11'),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/blog/category/remix`,
            lastModified: new Date('2026-03-11'),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/blog/category/research`,
            lastModified: new Date('2026-03-11'),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
    ];
}
