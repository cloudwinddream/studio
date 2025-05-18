
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // If using next-themes with App Router and it causes issues, you might need this.
  // However, often it's not required with recent versions.
  transpilePackages: ['next-themes', 'sxwnl'], // Added 'sxwnl'
};

export default nextConfig;
