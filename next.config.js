/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
}

module.exports = nextConfig
