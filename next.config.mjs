// next.config.mjs
const nextConfig = {
  images: {
    domains: ['backend.catodrive.com'], // Add your backend domain
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;