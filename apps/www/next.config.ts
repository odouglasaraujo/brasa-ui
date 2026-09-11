import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@brasa-ui/components", "@brasa-ui/tokens"],
};

export default nextConfig;
