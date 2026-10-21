import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/__/auth/:path*',     destination: 'https://rpg-viglione.firebaseapp.com/__/auth/:path*' },
      { source: '/__/firebase/:path*', destination: 'https://rpg-viglione.firebaseapp.com/__/firebase/:path*' },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
        ],
      },
    ];
  },
};

export default nextConfig;
