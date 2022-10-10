const nextTranspileModules = require('next-transpile-modules')
const nextPlausible = require('next-plausible')

const withTM = nextTranspileModules(['hooks', 'ui'])
const withPlausibleProxy = nextPlausible.withPlausibleProxy()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'abatme.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'www.gravatar.com' },
    ],
  },
}

module.exports = withPlausibleProxy(withTM(nextConfig))
