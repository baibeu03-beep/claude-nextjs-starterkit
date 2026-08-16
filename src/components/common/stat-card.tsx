import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/format";
import type { Stat } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function formatValue(value: number, format: Stat["format"]) {
  if (format === "currency") return formatCurrency(value);
  if (format === "percent") return `${value}%`;
  return formatNumber(value);
}

/** 대시보드 상단의 단일 지표 카드. */
export function StatCard({ label, value, delta, format }: Stat) {
  const isUp = delta >= 0;
  const TrendIcon = isUp ? TrendingUpIcon : TrendingDownIcon;

  return (
    <Card>
      <CardHeader className="gap-1">
        <CardDescription>{label}</CardDescription>
        <div className="flex items-center justify-between gap-2">
          <span className="font-heading text-2xl font-semibold tabular-nums">
            {formatValue(value, format)}
          </span>
          <Badge
            variant="secondary"
            className={cn(
              "gap-1 tabular-nums",
              isUp ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
            )}
          >
            <TrendIcon className="size-3" />
            {formatPercent(delta)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground">전월 대비</p>
      </CardContent>
    </Card>
  );
}
