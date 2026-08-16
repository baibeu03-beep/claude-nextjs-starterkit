"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    id: "email",
    title: "이메일 알림",
    description: "중요한 활동을 이메일로 받습니다.",
    defaultChecked: true,
  },
  {
    id: "push",
    title: "푸시 알림",
    description: "브라우저 푸시 알림을 받습니다.",
    defaultChecked: false,
  },
  {
    id: "weekly",
    title: "주간 리포트",
    description: "매주 월요일 요약 리포트를 받습니다.",
    defaultChecked: true,
  },
];

export function NotificationsCard() {
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(settings.map((s) => [s.id, s.defaultChecked])),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>알림</CardTitle>
        <CardDescription>수신할 알림 종류를 선택합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {settings.map((setting, index) => (
            <React.Fragment key={setting.id}>
              {index > 0 ? <FieldSeparator /> : null}
              <Field orientation="horizontal">
                <div className="flex-1 space-y-1">
                  <FieldTitle>
                    <Label htmlFor={`notify-${setting.id}`}>
                      {setting.title}
                    </Label>
                  </FieldTitle>
                  <FieldDescription>{setting.description}</FieldDescription>
                </div>
                <Switch
                  id={`notify-${setting.id}`}
                  checked={enabled[setting.id]}
                  onCheckedChange={(checked) => {
                    setEnabled((prev) => ({ ...prev, [setting.id]: checked }));
                    toast.success(
                      `${setting.title}을(를) ${checked ? "켰" : "껐"}습니다.`,
                    );
                  }}
                />
              </Field>
            </React.Fragment>
          ))}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
