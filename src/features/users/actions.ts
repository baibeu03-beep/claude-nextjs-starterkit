"use server";

import { revalidatePath } from "next/cache";

import { createUser, deleteUser } from "./data";
import { userInputSchema, type UserInput } from "./types";

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * 사용자 생성.
 *
 * 클라이언트에서 이미 zod로 검증했더라도 **서버에서 반드시 다시 검증**합니다.
 * 서버 액션은 공개 HTTP 엔드포인트이므로 클라이언트 검증을 신뢰할 수 없습니다.
 */
export async function createUserAction(
  input: UserInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = userInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "입력값을 확인해주세요.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const user = await createUser(parsed.data);
  revalidatePath("/users");

  return { ok: true, data: { id: user.id } };
}

export async function deleteUserAction(id: string): Promise<ActionResult> {
  const removed = await deleteUser(id);

  if (!removed) {
    return { ok: false, error: "사용자를 찾을 수 없습니다." };
  }

  revalidatePath("/users");
  return { ok: true, data: undefined };
}
