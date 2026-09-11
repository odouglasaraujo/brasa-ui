import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["brasa.ui"],
  output: "export",
};

export default nextConfig;
