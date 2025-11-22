// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This helps Next.js trace files correctly when the pages/ folder is not in the root.
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, 'src'),
  },
}

module.exports = nextConfig