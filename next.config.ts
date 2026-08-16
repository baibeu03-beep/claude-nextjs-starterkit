import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// 상위 디렉토리에 다른 package.json/lockfile 이 있어도 Turbopack 이
// 프로젝트 루트를 잘못 추론하지 않도록 명시적으로 고정합니다.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
