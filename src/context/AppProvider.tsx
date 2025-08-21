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

// Helper function to merge JSON data with localStorage data
const mergeData = (rawData: Day[], localData: Day[] | null): Day[] => {
  if (!localData || localData.length === 0) {
    console.log("No local data, using raw data");
    return rawData;
  }

  console.log(
    "Merging data - Raw:",
    rawData.length,
    "Local:",
    localData.length
  );

  // Create a map of local data by date for quick lookup
  const localDataMap = new Map<string, Day>();
  localData.forEach((day) => {
    localDataMap.set(day.date, day);
  });

  // Start with raw data as the base (ensures we always have the latest structure)
  const merged: Day[] = [...rawData];

  // Check if user has modified any existing dates or added new ones
  localData.forEach((localDay) => {
    const rawDayIndex = merged.findIndex((day) => day.date === localDay.date);

    if (rawDayIndex !== -1) {
      // Date exists in raw data - check if user modified it
      const rawDay = merged[rawDayIndex];
      const isModified =
        localDay.steps !== rawDay.steps ||
        localDay.calories !== rawDay.calories ||
        localDay.durationMinutes !== rawDay.durationMinutes ||
        localDay.note !== rawDay.note;

      if (isModified) {
        console.log(`Using user-modified data for ${localDay.date}`);
        merged[rawDayIndex] = localDay;
      }
    } else {
      // Date doesn't exist in raw data - user added it
      console.log(`Adding user-added date: ${localDay.date}`);
      merged.push(localDay);
    }
  });

  // Sort by date to maintain chronological order
  merged.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  console.log("Merge complete. Final length:", merged.length);
  return merged;
};

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [data, setData] = useState<Day[]>(() => {
    const localData = loadLocal<Day[]>(LOCAL_KEY);
    const rawData = raw as Day[];

    console.log("Initializing data:");
    console.log("- Raw data length:", rawData.length);
    console.log("- Local data length:", localData?.length || 0);

    const mergedData = mergeData(rawData, localData);
    console.log("- Merged data length:", mergedData.length);

    return mergedData;
  });

  const [theme, setTheme] = useState<"light" | "dark">(
    () => (loadLocal<string>(THEME_KEY) as "light" | "dark") ?? "light"
  );
  const [range, setRange] = useState<Range>("7D");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving data to localStorage, length:", data.length);
    saveLocal(LOCAL_KEY, data);
  }, [data]);

  // Save theme to localStorage and apply to document
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
