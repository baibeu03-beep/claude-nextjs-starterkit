"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { createUserAction } from "./actions";
import {
  USER_ROLES,
  USER_STATUSES,
  userInputSchema,
  userRoleLabels,
  userStatusLabels,
  type UserInput,
  type UserRole,
  type UserStatus,
} from "./types";

/**
 * 이 프로젝트의 **표준 폼 패턴**입니다.
 *
 * `base-nova` 레지스트리에는 shadcn의 `form` 컴포넌트가 없습니다(빈 스텁).
 * 대신 `Field` 계열로 마크업을 구성하고 상태/검증은 react-hook-form + zod가
 * 담당합니다. `FieldError`는 `errors` 배열을 받으므로 RHF의 에러 객체를
 * 그대로 감싸 넘기면 됩니다.
 *
 * `<Select>`는 네이티브 input이 아니므로 `register()`로 연결할 수 없습니다.
 * 이런 제어 컴포넌트는 `<Controller>`로 감쌉니다(`watch()`는 메모이제이션이
 * 불가능해 린트 경고가 납니다).
 */
export function UserForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<UserInput>({
    resolver: zodResolver(userInputSchema),
    defaultValues: { name: "", email: "", role: "viewer", status: "invited" },
  });

  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    const result = await createUserAction(values);

    if (!result.ok) {
      // 서버가 필드 단위 에러를 돌려주면 해당 필드에 다시 붙입니다.
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        form.setError(field as keyof UserInput, { message: messages[0] });
      }
      toast.error(result.error);
      return;
    }

    toast.success(`${values.name} 님을 추가했습니다.`);
    form.reset();
    onSuccess?.();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={Boolean(errors.name) || undefined}>
          <FieldLabel htmlFor="name">이름</FieldLabel>
          <Input
            id="name"
            placeholder="홍길동"
            aria-invalid={Boolean(errors.name)}
            {...form.register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={Boolean(errors.email) || undefined}>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            {...form.register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="role">역할</FieldLabel>
          <Controller
            control={form.control}
            name="role"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value as UserRole)}
              >
                <SelectTrigger id="role" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {userRoleLabels[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.role]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="status">상태</FieldLabel>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value as UserStatus)}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {USER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {userStatusLabels[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.status]} />
        </Field>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner /> : null}
          사용자 추가
        </Button>
      </FieldGroup>
    </form>
  );
}
