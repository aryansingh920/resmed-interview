import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import raw from "../data/exerciseData.json";
import { loadLocal, saveLocal } from "../utils/storage";

console.log("raw", raw, raw.length, typeof raw, Array.isArray(raw), raw[0]);

// console.log(raw);z
export type Day = {
  date: string;
  steps?: number;
  calories: number;
  durationMinutes: number;
  note?: string;
};
export type Range = "7D" | "14D" | "30D" | "ALL";

type AppState = {
  data: Day[];
  setData: React.Dispatch<React.SetStateAction<Day[]>>;
  theme: "light" | "dark";
  toggleTheme: () => void;
  range: Range;
  setRange: (r: Range) => void;
  selectedDate: string | null;
  setSelectedDate: (iso: string | null) => void;
};

const AppCtx = createContext<AppState | null>(null);

const LOCAL_KEY = "fitness-tracker-data-v1";
const THEME_KEY = "fitness-tracker-theme";

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<Day[]>(
    () => loadLocal<Day[]>(LOCAL_KEY) ?? (raw as Day[])
  );
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (loadLocal<string>(THEME_KEY) as "light" | "dark") ?? "light"
  );
  const [range, setRange] = useState<Range>("7D");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    saveLocal(LOCAL_KEY, data);
  }, [data]);
  useEffect(() => {
    saveLocal(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const value = useMemo<AppState>(
    () => ({
      data,
      setData,
      theme,
      toggleTheme,
      range,
      setRange,
      selectedDate,
      setSelectedDate,
    }),
    [data, theme, range, selectedDate]
  );

  useEffect(() => {
    console.log("Context data length:", data.length);
    console.log("Context data:", data);
  }, [data]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppCtx);
  console.log("ctx", ctx);

  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
