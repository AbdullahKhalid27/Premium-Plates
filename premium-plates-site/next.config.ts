import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Premium-Plates",
  images: { unoptimized: true },
};

export default nextConfig;
