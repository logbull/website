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
  trailingSlash: true,

  // Skip trailing slash for specific paths if needed
  skipTrailingSlashRedirect: false,
} as NextConfig);
