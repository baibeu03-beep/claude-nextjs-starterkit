import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { RevenueChart } from "@/features/dashboard/revenue-chart";
import { formatRelativeTime } from "@/lib/format";
import { dashboardStats, recentActivities, revenueSeries } from "@/lib/mock-data";

export const metadata: Metadata = { title: "대시보드" };

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="대시보드"
        description="이번 달 주요 지표를 한눈에 확인하세요."
        actions={<Button size="sm">리포트 내보내기</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueSeries} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>팀에서 일어난 최근 변경 사항</CardDescription>
          </CardHeader>
          <CardContent>
            <ItemGroup>
              {recentActivities.map((activity) => (
                <Item key={activity.id} className="px-0">
                  <ItemContent>
                    <ItemTitle>
                      {activity.actor} · {activity.action}
                    </ItemTitle>
                    <ItemDescription>
                      {activity.target} — {formatRelativeTime(activity.at)}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
