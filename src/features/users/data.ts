import "server-only";

import type { User, UserInput } from "./types";

/**
 * 인메모리 목 데이터.
 *
 * 실제 DB로 교체하는 지점입니다. 아래 함수들의 **시그니처를 유지한 채**
 * 본문만 Prisma/Drizzle 쿼리로 바꾸면 호출부는 수정할 필요가 없습니다.
 *
 * 주의: 모듈 스코프 배열이므로 서버가 재시작되거나 워커가 여러 개면 초기화됩니다.
 * 데모 목적에만 사용하세요.
 */
const users: User[] = [
  { id: "u_01", name: "김서연", email: "seoyeon.kim@example.com", role: "admin", status: "active", createdAt: "2026-01-12T09:24:00.000Z" },
  { id: "u_02", name: "박도윤", email: "doyun.park@example.com", role: "editor", status: "active", createdAt: "2026-02-03T14:10:00.000Z" },
  { id: "u_03", name: "이하은", email: "haeun.lee@example.com", role: "viewer", status: "invited", createdAt: "2026-02-28T02:45:00.000Z" },
  { id: "u_04", name: "최지호", email: "jiho.choi@example.com", role: "editor", status: "suspended", createdAt: "2026-03-15T11:02:00.000Z" },
  { id: "u_05", name: "정예린", email: "yerin.jung@example.com", role: "viewer", status: "active", createdAt: "2026-04-01T08:30:00.000Z" },
  { id: "u_06", name: "강민준", email: "minjun.kang@example.com", role: "admin", status: "active", createdAt: "2026-04-22T16:55:00.000Z" },
  { id: "u_07", name: "윤지우", email: "jiwoo.yoon@example.com", role: "viewer", status: "invited", createdAt: "2026-05-09T05:18:00.000Z" },
  { id: "u_08", name: "임서준", email: "seojun.lim@example.com", role: "editor", status: "active", createdAt: "2026-05-30T13:41:00.000Z" },
  { id: "u_09", name: "한아윤", email: "ayun.han@example.com", role: "viewer", status: "active", createdAt: "2026-06-11T07:07:00.000Z" },
  { id: "u_10", name: "오시우", email: "siwoo.oh@example.com", role: "editor", status: "suspended", createdAt: "2026-06-27T19:33:00.000Z" },
  { id: "u_11", name: "신다은", email: "daeun.shin@example.com", role: "viewer", status: "active", createdAt: "2026-07-08T10:12:00.000Z" },
  { id: "u_12", name: "배준서", email: "junseo.bae@example.com", role: "admin", status: "active", createdAt: "2026-07-25T22:04:00.000Z" },
];

export async function listUsers(): Promise<User[]> {
  return users;
}

export async function createUser(input: UserInput): Promise<User> {
  const user: User = {
    ...input,
    id: `u_${String(users.length + 1).padStart(2, "0")}`,
    createdAt: new Date().toISOString(),
  };
  users.unshift(user);
  return user;
}

export async function deleteUser(id: string): Promise<boolean> {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}
