import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Standard usage (Auto-detects i18n/request.ts)
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true, // <--- Moved out of 'experimental'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
