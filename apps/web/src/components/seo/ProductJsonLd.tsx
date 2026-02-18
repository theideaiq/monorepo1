import { webEnv as env } from '@repo/env/web';
import { safeJsonLdStringify } from '@repo/utils';
import type { Product } from '@/services/products';

interface ProductJsonLdProps {
  product: Product;
  currency?: string;
}

export default function ProductJsonLd({
  product,
  currency = 'IQD',
}: ProductJsonLdProps) {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL;
  const productUrl = `${baseUrl}/product/${product.slug}`;
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `${baseUrl}${product.image}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: imageUrl,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: product.seller || 'The IDEA',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: currency,
      price: product.price,
      itemCondition:
        product.condition === 'new'
          ? 'https://schema.org/NewCondition'
          : 'https://schema.org/UsedCondition',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: product.seller || 'The IDEA',
      },
    },
    aggregateRating:
      product.rating > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.details?.reviewCount || 1, // Fallback as required if rating exists
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is safe due to safeJsonLdStringify
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(jsonLd) }}
    />
  );
}
