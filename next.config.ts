import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Old WordPress / pre-WordPress URLs → new routes (see RECONSTRUCTION_NOTES.md → URLs and redirects).
 * Real pages keep their original paths (/about-us/, /gallery/, /contact/), so only leftover
 * theme-demo and legacy PHP URLs need redirecting.
 */
const redirects = [
  // Catera demo pages that were indexed by Wayback but were never part of Tony's navigation
  { source: "/service/:path*", destination: "/#events" },
  { source: "/services/:path*", destination: "/#events" },
  { source: "/menus/:path*", destination: "/" },
  { source: "/venues/:path*", destination: "/" },
  { source: "/2023/:path*", destination: "/" },
  { source: "/category/:path*", destination: "/" },
  { source: "/tag/:path*", destination: "/" },
  { source: "/author/:path*", destination: "/" },
  { source: "/feed", destination: "/" },
  { source: "/comments/feed", destination: "/" },
  { source: "/home-1", destination: "/" },
  // 2018 hand-built PHP site
  { source: "/index.php", destination: "/" },
  { source: "/contact.php", destination: "/contact/" },
  { source: "/gallery.php", destination: "/gallery/" },
  { source: "/events.php", destination: "/#events" },
  { source: "/weddings.php", destination: "/#events" },
  { source: "/promotions.php", destination: "/" },
  // Likely alternative spellings of the real pages
  { source: "/about", destination: "/about-us/" },
  { source: "/contact-us", destination: "/contact/" },
];

const nextConfig: NextConfig = {
  // Pin the workspace root (avoids Turbopack picking up a lockfile from a parent folder)
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  trailingSlash: true, // matches the WordPress permalinks (…/contact/)
  poweredByHeader: false,
  // The whole stylesheet is ~10 KB: inline it to remove render-blocking CSS requests
  experimental: { inlineCss: true },
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return redirects.map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
