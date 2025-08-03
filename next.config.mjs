// next.config.mjs
const nextConfig = {
  images: {
    domains: ['backend.catodrive.com'], // Add your backend domain
    domains: ['www.catodrive.com'],
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;