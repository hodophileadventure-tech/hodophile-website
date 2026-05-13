import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    // Disable built-in image optimization on hosts that block the internal image
    // optimizer or do not allow the `/_next/image` proxy routes.
    unoptimized: true,
  },
  
  // Security headers
  async headers() {
    return [
      // Video caching - aggressive caching for static videos
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Type",
            value: "video/:path*",
          },
        ],
      },
      {
        source: "/:video(hero-video|travel-kit)\\.:ext(mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // General security headers
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects for SEO (migrate old routes if needed)
  async redirects() {
    return [];
  },
};

export default nextConfig;
