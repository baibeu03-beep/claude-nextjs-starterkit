"use client";

import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const options = [
  { value: "light", label: "라이트", icon: SunIcon },
  { value: "dark", label: "다크", icon: MoonIcon },
  { value: "system", label: "시스템 설정 따르기", icon: MonitorIcon },
];

export function AppearanceCard() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>외관</CardTitle>
        <CardDescription>테마를 선택합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>테마</FieldLabel>
          <RadioGroup
            value={theme ?? "system"}
            onValueChange={(value) => setTheme(String(value))}
            className="gap-3"
          >
            {options.map(({ value, label, icon: Icon }) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem value={value} id={`theme-${value}`} />
                <Label
                  htmlFor={`theme-${value}`}
                  className="flex items-center gap-2 font-normal"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <FieldDescription>
            시스템 설정을 따르면 OS의 다크 모드에 맞춰 자동 전환됩니다.
          </FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
}
