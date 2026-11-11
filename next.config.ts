import type { NextConfig } from "next";

// URL path the app is served under (must match nginx.conf and the Dockerfile)
const basePath = "/3dttt";

const nextConfig: NextConfig = {
  output: "export",      // `next build` writes static files to out/
  basePath,
  trailingSlash: true,   // /3dttt/rules -> out/rules/index.html
  env: {
    BASE_PATH: basePath, // plain <img> tags don't get basePath added automatically
  },
};

export default nextConfig;
