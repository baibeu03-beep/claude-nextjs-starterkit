import Link from "next/link";
import { BookOpenIcon, BoxIcon } from "lucide-react";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/** 공개(랜딩) 페이지용 헤더. 앱 셸에서는 `AppHeader`를 씁니다. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-sm font-semibold"
        >
          <BoxIcon className="size-4" />
          {siteConfig.name}
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm" render={<Link href="/dashboard" />}>
            대시보드
          </Button>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={
              <a
                href={siteConfig.links.docs}
                target="_blank"
                rel="noreferrer noopener"
              />
            }
          >
            <BookOpenIcon />
            Docs
          </Button>
          <ThemeToggle size="icon-sm" variant="ghost" />
        </nav>
      </div>
    </header>
  );
}
