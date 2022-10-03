const withTM = require('next-transpile-modules')(['hooks', 'ui'])
const { withPlausibleProxy } = require('next-plausible')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'abatme.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'www.gravatar.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
    ],
  },
}

module.exports = withPlausibleProxy()(withTM(nextConfig))
