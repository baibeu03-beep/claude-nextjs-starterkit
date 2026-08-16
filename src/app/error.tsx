"use client";

import { useEffect } from "react";
import { RotateCcwIcon, TriangleAlertIcon } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

/** 전역 에러 바운더리. 하위 세그먼트의 `error.tsx`가 없을 때 여기로 옵니다. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <EmptyState
        className="max-w-md"
        icon={TriangleAlertIcon}
        title="문제가 발생했습니다"
        description={error.message || "예기치 못한 오류가 발생했습니다."}
        action={
          <Button onClick={reset} variant="outline">
            <RotateCcwIcon />
            다시 시도
          </Button>
        }
      />
    </main>
  );
}
