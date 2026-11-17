import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Premium-Plates",
  images: { unoptimized: true },
};

export default nextConfig;
