"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  /** 제출 중에 표시할 문구. 생략하면 children을 그대로 유지합니다. */
  pendingLabel?: string;
};

/**
 * `<form action={serverAction}>` 안에서 쓰는 제출 버튼.
 *
 * `useFormStatus`는 **상위 form의 자식**에서만 동작하므로 별도 컴포넌트로
 * 분리되어 있어야 합니다. 폼과 같은 컴포넌트에 두면 항상 pending=false 입니다.
 */
export function SubmitButton({
  children,
  pendingLabel,
  disabled,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? <Spinner /> : null}
      {pending && pendingLabel ? pendingLabel : children}
    </Button>
  );
}
