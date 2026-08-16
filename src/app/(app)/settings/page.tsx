import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { SettingsTabs } from "@/features/settings/settings-tabs";

export const metadata: Metadata = { title: "설정" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="설정"
        description="계정과 앱 환경을 관리합니다."
      />
      <SettingsTabs />
    </>
  );
}
