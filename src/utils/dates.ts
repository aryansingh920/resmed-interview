import { format, isAfter, isBefore, parseISO, subDays } from "date-fns";
import type { Day } from "../context/AppProvider";

export const fmt = (iso: string) => format(parseISO(iso), "MMM d");
export const byDateAsc = (a: Day, b: Day) => a.date.localeCompare(b.date);

export const sliceByRange = (
  data: Day[],
  range: "7D" | "14D" | "30D" | "ALL"
) => {
  if (range === "ALL") return [...data].sort(byDateAsc);
  const days = range === "7D" ? 7 : range === "14D" ? 14 : 30;
  const sorted = [...data].sort(byDateAsc);
  const end = parseISO(sorted[sorted.length - 1].date);
  const start = subDays(end, days - 1);
  return sorted.filter((d) => {
    const t = parseISO(d.date);
    return !isBefore(t, start) && !isAfter(t, end);
  });
};
