import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * 타입 안전한 환경변수.
 *
 * 스키마에 없는 변수는 여기서 읽을 수 없고, 스키마를 어기면 **빌드가 실패**합니다.
 * `process.env`를 직접 읽는 대신 항상 이 객체를 import 하세요.
 *
 * 클라이언트 번들에 포함되어야 하는 값은 반드시 `NEXT_PUBLIC_` 접두사와 함께
 * `client` 블록에 선언하고, `runtimeEnv`에도 등록해야 합니다.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  },
  /**
   * Next.js는 클라이언트 번들에서 `process.env`를 통째로 참조할 수 없으므로
   * 사용하는 변수를 하나씩 나열해야 합니다.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  /** 린트/CI 등에서 검증을 건너뛰고 싶을 때 사용합니다. */
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
});
