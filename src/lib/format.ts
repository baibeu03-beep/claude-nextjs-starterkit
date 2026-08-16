import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

function toDate(value: Date | string | number): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string") return parseISO(value);
  return new Date(value);
}

/** `2026-08-16` 형태로 포맷합니다. */
export function formatDate(
  value: Date | string | number,
  pattern = "yyyy-MM-dd",
): string {
  return format(toDate(value), pattern, { locale: ko });
}

/** `2026-08-16 14:30` 형태로 포맷합니다. */
export function formatDateTime(value: Date | string | number): string {
  return formatDate(value, "yyyy-MM-dd HH:mm");
}

/** `3일 전` 형태의 상대 시간으로 포맷합니다. */
export function formatRelativeTime(value: Date | string | number): string {
  return formatDistanceToNow(toDate(value), { addSuffix: true, locale: ko });
}

/** `1,234` 형태로 천 단위 구분자를 넣습니다. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value);
}

/** `₩1,234` 형태로 포맷합니다. */
export function formatCurrency(value: number, currency = "KRW"): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** `+12.5%` 형태로 부호를 포함해 포맷합니다. */
export function formatPercent(value: number, fractionDigits = 1): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}
