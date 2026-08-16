import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CommandMenu } from "@/components/layout/command-menu";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

/** 앱 셸 상단 바. 사이드바 토글 + 브레드크럼 + 검색 + 테마. */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-2">
        <CommandMenu />
        <ThemeToggle size="icon-sm" variant="ghost" />
      </div>
    </header>
  );
}
