import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  async redirects() {
    return [
      // ── Strip WordPress query-param ghost URLs ─────────────────────────
      // /?page_id=* → / (301)
      {
        source: "/",
        has: [{ type: "query", key: "page_id" }],
        destination: "/",
        permanent: true,
      },
      // /?feed=* → / (301)
      {
        source: "/",
        has: [{ type: "query", key: "feed" }],
        destination: "/",
        permanent: true,
      },
      // /?p=* (WP post IDs)
      {
        source: "/",
        has: [{ type: "query", key: "p" }],
        destination: "/",
        permanent: true,
      },
      // /?cat=* (WP category IDs)
      {
        source: "/",
        has: [{ type: "query", key: "cat" }],
        destination: "/",
        permanent: true,
      },

      // ── Old cPanel default page ─────────────────────────────────────────
      { source: "/cgi-sys/:path*", destination: "/", permanent: true },
      { source: "/cgi-bin/:path*", destination: "/", permanent: true },

      // ── WordPress paths that may still be indexed ───────────────────────
      { source: "/wp-admin/:path*",    destination: "/", permanent: true },
      { source: "/wp-login.php",       destination: "/", permanent: true },
      { source: "/wp-content/:path*",  destination: "/", permanent: true },
      { source: "/wp-includes/:path*", destination: "/", permanent: true },
      { source: "/wp-json/:path*",     destination: "/", permanent: true },
      { source: "/xmlrpc.php",         destination: "/", permanent: true },
      { source: "/feed",               destination: "/", permanent: true },
      { source: "/feed/:path*",        destination: "/", permanent: true },
      { source: "/comments/feed",      destination: "/", permanent: true },

      // ── Old service page URLs that were renamed/deleted ─────────────────
      {
        source: "/services/knives-self-defense",
        destination: "/services/knife-tactical-outdoor",
        permanent: true,
      },
      {
        source: "/services/other-services",
        destination: "/services/growth-services",
        permanent: true,
      },
      {
        source: "/services/tactical-gear",
        destination: "/services/firearms-ammo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
