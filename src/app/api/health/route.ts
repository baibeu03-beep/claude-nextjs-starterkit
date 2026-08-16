import { NextResponse } from "next/server";

import { env } from "@/lib/env";

/**
 * Route Handler 참고 구현.
 *
 * 기본적으로 정적 평가될 수 있으므로, 매 요청마다 실행되어야 하는
 * 헬스체크는 `dynamic = "force-dynamic"`으로 강제합니다.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
