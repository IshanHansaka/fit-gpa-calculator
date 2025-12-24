import type { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable:
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withPWA(nextConfig);
