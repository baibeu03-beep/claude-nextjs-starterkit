"use client";

import * as React from "react";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/common/confirm-dialog";
import {
  DataTableColumnHeader,
  type AppColumnDef,
} from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import { deleteUserAction } from "./actions";
import {
  userRoleLabels,
  userStatusLabels,
  type User,
  type UserStatus,
} from "./types";

const statusVariant: Record<
  UserStatus,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  active: "default",
  invited: "secondary",
  suspended: "destructive",
};

/**
 * 사용자 테이블 컬럼 정의.
 *
 * 도메인 지식(라벨, 배지 색, 액션)은 전부 여기 모여 있고, `DataTable`은
 * 이 배열만 받아 렌더링합니다.
 */
export const userColumns: AppColumnDef<User>[] = [
  {
    accessorKey: "name",
    meta: { label: "이름" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이름" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    meta: { label: "이메일" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="이메일" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
  },
  {
    accessorKey: "role",
    meta: { label: "역할" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="역할" />
    ),
    cell: ({ row }) => userRoleLabels[row.original.role],
  },
  {
    accessorKey: "status",
    meta: { label: "상태" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="상태" />
    ),
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]}>
        {userStatusLabels[row.original.status]}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    meta: { label: "가입일" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="가입일" />
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">{formatDate(row.original.createdAt)}</span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <span className="sr-only">액션</span>,
    cell: ({ row }) => <RowActions user={row.original} />,
  },
];

function RowActions({ user }: { user: User }) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  async function handleDelete() {
    const result = await deleteUserAction(user.id);
    if (result.ok) {
      toast.success(`${user.name} 님을 삭제했습니다.`);
    } else {
      toast.error(result.error);
    }
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontalIcon />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              void navigator.clipboard.writeText(user.email);
              toast.success("이메일을 복사했습니다.");
            }}
          >
            이메일 복사
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2Icon />
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 메뉴가 닫히면서 트리거가 언마운트되므로 다이얼로그는 메뉴 밖에 두고
          열림 상태만 제어합니다. */}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        destructive
        title="사용자를 삭제할까요?"
        description={`${user.name} 님의 계정이 영구적으로 삭제됩니다. 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        onConfirm={handleDelete}
      />
    </div>
  );
}
