"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  bio: z.string().max(160, "소개는 160자를 넘을 수 없습니다.").optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "김서연",
      email: "seoyeon.kim@example.com",
      bio: "",
    },
  });

  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    // 실제 서버 액션 호출로 교체하세요.
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("프로필을 저장했습니다.", { description: values.email });
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Card>
        <CardHeader>
          <CardTitle>프로필</CardTitle>
          <CardDescription>
            다른 팀원에게 표시되는 정보를 수정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={Boolean(errors.name) || undefined}>
              <FieldLabel htmlFor="profile-name">이름</FieldLabel>
              <Input
                id="profile-name"
                aria-invalid={Boolean(errors.name)}
                {...form.register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            <Field data-invalid={Boolean(errors.email) || undefined}>
              <FieldLabel htmlFor="profile-email">이메일</FieldLabel>
              <Input
                id="profile-email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                {...form.register("email")}
              />
              <FieldDescription>
                로그인과 알림 수신에 사용됩니다.
              </FieldDescription>
              <FieldError errors={[errors.email]} />
            </Field>

            <Field data-invalid={Boolean(errors.bio) || undefined}>
              <FieldLabel htmlFor="profile-bio">소개</FieldLabel>
              <Textarea
                id="profile-bio"
                rows={3}
                placeholder="간단한 자기소개를 입력하세요."
                aria-invalid={Boolean(errors.bio)}
                {...form.register("bio")}
              />
              <FieldError errors={[errors.bio]} />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : null}
            변경 사항 저장
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
