/**
 * 대시보드 데모용 목 데이터.
 * 실제 집계 쿼리 / 분석 API로 교체하는 지점입니다.
 */

export type Stat = {
  label: string;
  value: number;
  /** 전월 대비 증감률(%). 음수면 감소. */
  delta: number;
  format: "number" | "currency" | "percent";
};

export const dashboardStats: Stat[] = [
  { label: "총 매출", value: 48250000, delta: 12.5, format: "currency" },
  { label: "신규 가입", value: 1284, delta: 8.2, format: "number" },
  { label: "활성 사용자", value: 9432, delta: -3.1, format: "number" },
  { label: "전환율", value: 4.8, delta: 0.6, format: "percent" },
];

export type RevenuePoint = {
  month: string;
  revenue: number;
  orders: number;
};

export const revenueSeries: RevenuePoint[] = [
  { month: "1월", revenue: 28400000, orders: 620 },
  { month: "2월", revenue: 31200000, orders: 704 },
  { month: "3월", revenue: 29800000, orders: 668 },
  { month: "4월", revenue: 36500000, orders: 812 },
  { month: "5월", revenue: 39100000, orders: 878 },
  { month: "6월", revenue: 42700000, orders: 941 },
  { month: "7월", revenue: 45300000, orders: 1002 },
  { month: "8월", revenue: 48250000, orders: 1084 },
];

export type Activity = {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
};

export const recentActivities: Activity[] = [
  { id: "a_1", actor: "김서연", action: "사용자를 초대했습니다", target: "haeun.lee@example.com", at: "2026-08-16T08:12:00.000Z" },
  { id: "a_2", actor: "박도윤", action: "설정을 변경했습니다", target: "알림 · 이메일", at: "2026-08-15T17:40:00.000Z" },
  { id: "a_3", actor: "강민준", action: "역할을 수정했습니다", target: "임서준 → 편집자", at: "2026-08-14T11:05:00.000Z" },
  { id: "a_4", actor: "정예린", action: "리포트를 내보냈습니다", target: "2026-07 매출", at: "2026-08-13T09:28:00.000Z" },
  { id: "a_5", actor: "배준서", action: "계정을 정지했습니다", target: "oh.siwoo@example.com", at: "2026-08-12T15:52:00.000Z" },
];
