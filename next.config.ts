import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Next.js bootstraps pages with inline scripts and framer-motion writes inline styles, so
// 'unsafe-inline' is needed without a nonce setup (which would force every page to render
// dynamically). Every other source is locked to an explicit allowlist.
// cdnjs + Google Fonts are used by the standalone CV page (public/cv/index.html, SRI-pinned).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://cdnjs.cloudflare.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
  "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob: https://images.unsplash.com",
  `connect-src 'self' https://speed.cloudflare.com${isDev ? " ws: wss:" : ""}`,
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "worker-src 'self' blob:",
  "media-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Local images only without query strings, and remote images only in the exact form the
    // blog uses, so nobody can flood the optimizer (and its cache) with endless URL variants.
    localPatterns: [{ pathname: "/**", search: "" }],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*", search: "?w=1200" },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
