import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * 앱 전역 Provider 모음.
 *
 * 중첩 순서에는 이유가 있습니다:
 * 1. `ThemeProvider` — `<html>`에 클래스를 붙이므로 가장 바깥
 * 2. `NuqsAdapter`  — URL 쿼리 상태를 읽는 모든 컴포넌트를 감싸야 함
 * 3. `TooltipProvider` — 툴팁 지연 시간을 공유
 *
 * `<Toaster />`는 여기 넣지 않고 `layout.tsx`에서 형제로 렌더링합니다.
 * (토스트는 어떤 Provider 컨텍스트에도 의존하지 않습니다.)
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <TooltipProvider>{children}</TooltipProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
