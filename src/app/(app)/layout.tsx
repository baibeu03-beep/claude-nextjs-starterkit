import { cookies } from "next/headers";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/session";

/**
 * 인증된 영역의 앱 셸.
 *
 * 사이드바 열림 상태는 `sidebar.tsx`가 `sidebar_state` 쿠키에 기록합니다.
 * 그 값을 **서버에서 미리 읽어** `defaultOpen`으로 넘겨야 새로고침 시
 * 사이드바가 열렸다 닫히는 깜빡임이 없습니다.
 */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  const [cookieStore, user] = await Promise.all([cookies(), getCurrentUser()]);
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="flex-1">
      <AppSidebar user={user} />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
