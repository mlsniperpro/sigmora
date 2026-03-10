import Script from 'next/script';
import { homeDescription, marketingFaqs, siteUrl } from '@/lib/marketing-content';

export function JsonLd() {
    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Sigmora',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: homeDescription,
    };

    const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Sigmora',
        url: siteUrl,
        description: homeDescription,
    };

    const softwareApplicationData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Sigmora',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: siteUrl,
        description: homeDescription,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    const faqPageData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: marketingFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    };

    return (
        <>
            <Script
                id="organization-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />
            <Script
                id="website-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
            />
            <Script
                id="software-application-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
            />
            <Script
                id="faq-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageData) }}
            />
        </>
    );
}
