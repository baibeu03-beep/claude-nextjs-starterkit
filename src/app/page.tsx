import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  CommandIcon,
  LayersIcon,
  MoonIcon,
  ShieldCheckIcon,
  TableIcon,
} from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DemoPanel } from "@/features/demo/demo-panel";

const stack = [
  { name: "Next.js", version: "16.3.1", note: "App Router · Turbopack" },
  { name: "React", version: "19.2.8", note: "Server Components" },
  { name: "TypeScript", version: "5.9.3", note: "strict mode" },
  { name: "Tailwind CSS", version: "4.3.3", note: "CSS-first · config 파일 없음" },
  { name: "shadcn/ui", version: "base-nova", note: "Base UI · lucide-react" },
];

const features = [
  {
    icon: LayersIcon,
    title: "4계층 컴포넌트 구조",
    description:
      "ui → common → layout → features. 새 컴포넌트를 어디 둘지 고민할 필요가 없습니다.",
  },
  {
    icon: TableIcon,
    title: "데이터 테이블",
    description:
      "TanStack Table v9 기반 정렬·검색·페이지네이션. 상태는 URL에 동기화됩니다.",
  },
  {
    icon: ShieldCheckIcon,
    title: "타입 안전한 폼",
    description:
      "react-hook-form + zod. 같은 스키마를 서버 액션에서 재검증합니다.",
  },
  {
    icon: MoonIcon,
    title: "다크 모드",
    description:
      "next-themes + oklch 토큰. 시스템 설정을 따르고 FOUC가 없습니다.",
  },
  {
    icon: CommandIcon,
    title: "커맨드 팔레트",
    description: "⌘K로 어디서든 페이지 이동과 테마 전환이 가능합니다.",
  },
  {
    icon: ShieldCheckIcon,
    title: "환경변수 검증",
    description:
      "@t3-oss/env-nextjs로 스키마를 어기면 런타임이 아니라 빌드에서 실패합니다.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16">
        <section className="flex flex-col items-start gap-4">
          <Badge variant="secondary">Starter Kit</Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            바로 기능 개발부터 시작하는 Next.js 스타터킷
          </h1>
          <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
            앱 셸, 인증 화면, 데이터 테이블, 폼 검증까지 모든 웹앱의 공통 기반이
            갖춰져 있습니다. 설정 대신 제품을 만드세요.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Button render={<Link href="/dashboard" />}>
              대시보드 둘러보기
              <ArrowRightIcon />
            </Button>
            <Button variant="outline" render={<Link href="/login" />}>
              로그인 화면
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold">포함된 기능</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="text-pretty">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold">기술 스택</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckIcon className="size-4 text-muted-foreground" />
                    {item.name}
                  </CardTitle>
                  <CardDescription>{item.note}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-mono text-sm text-muted-foreground">
                    {item.version}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold">
            컴포넌트 동작 확인
          </h2>
          <Card>
            <CardContent className="pt-6">
              <DemoPanel />
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
