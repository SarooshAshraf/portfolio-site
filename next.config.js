// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  experimental: { typedRoutes: true },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  trailingSlash: true,
  // If you later use next/image with static export, you'll need this:
  images: { unoptimized: true },
};

module.exports = withMDX(nextConfig);


