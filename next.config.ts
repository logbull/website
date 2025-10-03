import type { NextConfig } from 'next';
import nextra from 'nextra';

// Set up Nextra
const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: true,
  },
});

// Export the final Next.js config with Nextra included
export default withNextra({
  // Configure for static export (GitHub Pages)
  output: 'export',
  images: {
    unoptimized: true,
  },

  // Add regular Next.js options here
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ],
} as NextConfig);
