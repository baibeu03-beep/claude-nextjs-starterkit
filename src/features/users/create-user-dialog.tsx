"use client";

import * as React from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";

/** 사용자 추가 다이얼로그. 제출에 성공하면 스스로 닫힙니다. */
export function CreateUserDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="sm">
            <PlusIcon />
            사용자 추가
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 추가</DialogTitle>
          <DialogDescription>
            새 사용자를 초대합니다. 이메일로 초대 링크가 발송됩니다.
          </DialogDescription>
        </DialogHeader>
        <UserForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
