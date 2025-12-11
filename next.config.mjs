/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Set to false if you want production builds to abort if there are type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // This allows build to succeed even if there are ESLint errors
    ignoreDuringBuilds: false,
  },
  headers: async () => {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ]
  },
export default nextConfig;
