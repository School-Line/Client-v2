/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { newNextLinkBehavior: false },
  images: {
    domains: ['cdn.discordapp.com'],
  },
}

module.exports = nextConfig
