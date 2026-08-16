/**
 * 앱 전역 메타데이터의 단일 소스.
 * `app/layout.tsx`의 `metadata`와 헤더/푸터가 이 값을 읽습니다.
 */
export const siteConfig = {
  name: "Starter Kit",
  title: "Next.js Starter Kit",
  description:
    "Next.js 16 App Router + TypeScript + Tailwind CSS v4 + shadcn/ui 스타터 킷",
  links: {
    docs: "https://nextjs.org/docs",
    shadcn: "https://ui.shadcn.com",
    baseUi: "https://base-ui.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
