import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://172.17.64.1",
    "http://172.17.64.1:*",
  ],
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
