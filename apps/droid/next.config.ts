import '@repo/env/droid';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/env'],
};

export default nextConfig;
