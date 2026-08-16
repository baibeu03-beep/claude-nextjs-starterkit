import { z } from "zod";

export const USER_ROLES = ["admin", "editor", "viewer"] as const;
export const USER_STATUSES = ["active", "invited", "suspended"] as const;

export const userRoleLabels: Record<UserRole, string> = {
  admin: "관리자",
  editor: "편집자",
  viewer: "뷰어",
};

export const userStatusLabels: Record<UserStatus, string> = {
  active: "활성",
  invited: "초대됨",
  suspended: "정지",
};

/**
 * 사용자 입력 스키마 — 폼과 서버 액션이 **같은 스키마를 공유**합니다.
 * 클라이언트 검증은 UX용일 뿐이므로 서버 액션에서 반드시 다시 검증합니다.
 */
export const userInputSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다.")
    .max(40, "이름은 40자를 넘을 수 없습니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  role: z.enum(USER_ROLES, { message: "역할을 선택해주세요." }),
  status: z.enum(USER_STATUSES, { message: "상태를 선택해주세요." }),
});

export const userSchema = userInputSchema.extend({
  id: z.string(),
  createdAt: z.string(),
});

export type UserRole = (typeof USER_ROLES)[number];
export type UserStatus = (typeof USER_STATUSES)[number];
export type UserInput = z.infer<typeof userInputSchema>;
export type User = z.infer<typeof userSchema>;
