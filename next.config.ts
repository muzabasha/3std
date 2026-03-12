import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  images: { unoptimized: false },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
