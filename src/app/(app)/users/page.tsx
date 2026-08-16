import type { Metadata } from "next";
import { UsersIcon } from "lucide-react";

import { DataTable } from "@/components/common/data-table";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { CreateUserDialog } from "@/features/users/create-user-dialog";
import { userColumns } from "@/features/users/columns";
import { listUsers } from "@/features/users/data";

export const metadata: Metadata = { title: "사용자" };

/**
 * 서버 컴포넌트에서 데이터를 읽고, 상호작용이 필요한 테이블에만 넘깁니다.
 * 데이터 페칭 코드는 클라이언트 번들에 포함되지 않습니다.
 */
export default async function UsersPage() {
  const users = await listUsers();

  return (
    <>
      <PageHeader
        title="사용자"
        description="팀 구성원을 관리하고 역할을 지정하세요."
        actions={<CreateUserDialog />}
      />

      <DataTable
        columns={userColumns}
        data={users}
        searchPlaceholder="이름 또는 이메일 검색..."
        emptyState={
          <EmptyState
            className="border-0"
            icon={UsersIcon}
            title="사용자가 없습니다"
            description="검색어를 바꾸거나 새 사용자를 추가해보세요."
          />
        }
      />
    </>
  );
}
