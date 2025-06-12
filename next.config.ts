import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    esmExternals: true
  },
  // serverExternalPackages: ['@react-pdf/renderer'],
  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
  transpilePackages: ['@react-pdf/renderer']
}

export default nextConfig
