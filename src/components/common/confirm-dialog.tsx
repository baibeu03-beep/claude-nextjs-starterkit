"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

type ConfirmDialogProps = {
  /**
   * 다이얼로그를 여는 요소. Base UI 관용구에 따라 `render`로 합성됩니다.
   * 드롭다운 메뉴 안에서 열 때처럼 트리거를 둘 수 없는 경우에는 생략하고
   * `open`/`onOpenChange`로 직접 제어하세요.
   */
  trigger?: React.ReactElement<Record<string, unknown>>;
  /** 제어 모드로 쓸 때의 열림 상태. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** 확인 버튼을 destructive 스타일로 표시합니다. */
  destructive?: boolean;
  /** 비동기 함수를 넘기면 완료될 때까지 확인 버튼이 pending 상태가 됩니다. */
  onConfirm: () => void | Promise<void>;
};

/**
 * 되돌릴 수 없는 동작 앞에 세우는 확인 다이얼로그.
 *
 * `AlertDialogAction`은 자동으로 닫히지 않으므로(단순 Button) 여기서 열림 상태를
 * 직접 제어합니다. 덕분에 비동기 작업이 끝난 뒤에 닫을 수 있습니다.
 */
export function ConfirmDialog({
  trigger,
  open: openProp,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  destructive = false,
  onConfirm,
}: ConfirmDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  async function handleConfirm() {
    try {
      setPending(true);
      await onConfirm();
      setOpen(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger ? <AlertDialogTrigger render={trigger} /> : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            variant={destructive ? "destructive" : "default"}
            disabled={pending}
            onClick={handleConfirm}
          >
            {pending ? <Spinner /> : null}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
