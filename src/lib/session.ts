import "server-only";

export type SessionUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

/**
 * 현재 로그인한 사용자.
 *
 * **인증 백엔드를 붙이는 지점입니다.** NextAuth/Clerk/Supabase 등으로 교체할 때
 * 이 함수의 반환 타입만 유지하면 호출부(`(app)/layout.tsx`)는 그대로 둘 수 있습니다.
 * 실제 구현에서는 세션이 없을 때 `null`을 반환하고 호출부에서 `redirect("/login")`
 * 하도록 바꾸세요.
 */
export async function getCurrentUser(): Promise<SessionUser> {
  return {
    name: "김서연",
    email: "seoyeon.kim@example.com",
  };
}
