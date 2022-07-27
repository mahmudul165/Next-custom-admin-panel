/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "randomuser.me"],
  },
};

// module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({});

// "analyze": "cross-env ANALYZE=true next build",
//     "analyze:server": "cross-env BUNDLE_ANALYZE=server next build",
//     "analyze:browser": "cross-env BUNDLE_ANALYZE=browser next build"

// https://flaviocopes.com/nextjs-analyze-app-bundle/
// npm run analyze
