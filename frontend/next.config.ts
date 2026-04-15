import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Images du backend Go en développement
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/uploads/**",
      },
      {
        // Photos lunettes de vue — Unsplash CDN
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
}

export default nextConfig
