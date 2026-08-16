"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, type LoginInput } from "./schemas";

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    // TODO: 인증 백엔드 연결 지점.
    // 예) const result = await signIn("credentials", { ...values, redirect: false })
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("로그인 요청됨", {
      description: `${values.email} — 인증 백엔드를 연결하면 실제로 동작합니다.`,
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력해 계정에 접속하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={Boolean(errors.email) || undefined}>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email)}
                {...form.register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={Boolean(errors.password) || undefined}>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">비밀번호</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                {...form.register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            {/* 제출 버튼과 회원가입 안내는 하나의 Field로 묶어 간격을 좁힙니다
                (login-01 블록과 동일한 구조). Field가 자식에 w-full을 적용합니다. */}
            <Field>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {/* Spinner의 role="status" aria-label="Loading"이 버튼의 접근
                    가능한 이름에 섞이지 않도록 숨깁니다. 로딩 상태는 aria-busy로
                    전달됩니다. */}
                {isSubmitting ? <Spinner aria-hidden /> : null}
                로그인하기
              </Button>

              {/* FieldDescription이 자식 앵커에 underline과 hover:text-primary를
                  적용하므로 Link에 별도 클래스가 필요 없습니다. */}
              <FieldDescription className="text-center">
                계정이 없으신가요? <Link href="/signup">회원가입</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
