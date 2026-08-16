"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppearanceCard } from "./appearance-card";
import { NotificationsCard } from "./notifications-card";
import { ProfileForm } from "./profile-form";

const TABS = ["profile", "appearance", "notifications"] as const;

const tabLabels: Record<(typeof TABS)[number], string> = {
  profile: "프로필",
  appearance: "외관",
  notifications: "알림",
};

/**
 * 탭 상태를 `?tab=` 쿼리에 동기화합니다.
 *
 * 덕분에 사이드바의 `설정 > 외관` 같은 링크가 실제로 해당 탭을 열고,
 * 새로고침해도 탭이 유지됩니다. 로컬 `useState`였다면 둘 다 불가능합니다.
 */
export function SettingsTabs() {
  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringLiteral(TABS).withDefault("profile").withOptions({
      shallow: true,
      clearOnDefault: true,
    }),
  );

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as (typeof TABS)[number])}
      className="gap-6"
    >
      <TabsList>
        {TABS.map((value) => (
          <TabsTrigger key={value} value={value}>
            {tabLabels[value]}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="profile" className="max-w-2xl">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="appearance" className="max-w-2xl">
        <AppearanceCard />
      </TabsContent>
      <TabsContent value="notifications" className="max-w-2xl">
        <NotificationsCard />
      </TabsContent>
    </Tabs>
  );
}
