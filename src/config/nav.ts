import {
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  /** 사이드바에서 접이식 서브메뉴로 렌더링됩니다. */
  items?: Array<Pick<NavItem, "title" | "href">>;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/**
 * 네비게이션의 단일 소스.
 *
 * 사이드바(`nav-main.tsx`)와 브레드크럼(`breadcrumbs.tsx`)이 모두 이 배열을
 * 참조합니다. 라우트를 추가할 때 이 파일만 수정하면 두 곳에 동시에 반영됩니다.
 */
export const navGroups: NavGroup[] = [
  {
    label: "일반",
    items: [
      { title: "대시보드", href: "/dashboard", icon: LayoutDashboardIcon },
      { title: "사용자", href: "/users", icon: UsersIcon },
    ],
  },
  {
    label: "관리",
    items: [
      {
        title: "설정",
        href: "/settings",
        icon: SettingsIcon,
        items: [
          { title: "프로필", href: "/settings?tab=profile" },
          { title: "외관", href: "/settings?tab=appearance" },
          { title: "알림", href: "/settings?tab=notifications" },
        ],
      },
    ],
  },
];

/** 브레드크럼 라벨 조회용 평탄화 맵. `/dashboard` → "대시보드" */
export const navLabelByHref: Record<string, string> = Object.fromEntries(
  navGroups.flatMap((group) =>
    group.items.flatMap((item) => [
      [item.href, item.title] as const,
      ...(item.items ?? []).map(
        (sub) => [sub.href.split("?")[0], sub.title] as const,
      ),
    ]),
  ),
);
