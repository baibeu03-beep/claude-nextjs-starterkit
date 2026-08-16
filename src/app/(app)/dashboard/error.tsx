"use client";

import { useEffect } from "react";
import { RotateCcwIcon, TriangleAlertIcon } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

/**
 * 세그먼트 단위 에러 바운더리.
 * 반드시 클라이언트 컴포넌트여야 하며, `reset`으로 재렌더를 시도할 수 있습니다.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 실제 서비스에서는 Sentry 등 에러 리포팅으로 교체하세요.
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      icon={TriangleAlertIcon}
      title="대시보드를 불러오지 못했습니다"
      description={error.message || "잠시 후 다시 시도해주세요."}
      action={
        <Button onClick={reset} variant="outline">
          <RotateCcwIcon />
          다시 시도
        </Button>
      }
    />
  );
}
