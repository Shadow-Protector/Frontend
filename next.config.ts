import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://logo.moralis.io/**")],
  },
};

export default nextConfig;
