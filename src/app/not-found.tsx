import Link from "next/link";
import { CompassIcon } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <EmptyState
        className="max-w-md"
        icon={CompassIcon}
        title="페이지를 찾을 수 없습니다"
        description="주소가 바뀌었거나 삭제된 페이지입니다."
        action={
          <Button render={<Link href="/" />}>홈으로 돌아가기</Button>
        }
      />
    </main>
  );
}
