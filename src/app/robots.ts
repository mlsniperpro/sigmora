import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/dashboard/', '/workspaces/', '/login', '/signup'],
        },
        sitemap: 'https://sigmora.com/sitemap.xml',
    };
}
