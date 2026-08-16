import Link from "next/link";
import { BoxIcon } from "lucide-react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { siteConfig } from "@/config/site";

/**
 * 인증 화면 셸.
 *
 * `(app)`과 달리 사이드바가 없습니다. 라우트 그룹을 쓰면 URL에는 영향을 주지
 * 않으면서 이렇게 완전히 다른 레이아웃을 적용할 수 있습니다.
 */
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="absolute end-4 top-4">
        <ThemeToggle size="icon-sm" variant="ghost" />
      </div>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-sm font-semibold"
        >
          <BoxIcon className="size-4" />
          {siteConfig.name}
        </Link>
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
