/** @type {import('next').NextConfig} */

// next.config.js

module.exports = {
  images: {
    domains: ["images.dog.ceo"],
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/registration',
        permanent: true,
      },
    ]
  },
}
