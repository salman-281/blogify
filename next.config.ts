import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', "randomuser.me", "blog-production-d0d4.up.railway.app"], // ✅ Add the domain you're using
  },
};

export default nextConfig;
