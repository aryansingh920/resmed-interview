import React, { createContext, useReducer, useContext, Dispatch } from "react";

type Theme = "light" | "dark";

// Add types for the fitness data
type FitnessData = {
  date: string;
  steps: number | null;
  calories: number;
  durationMinutes: number;
};

type DateRange = {
  start: string;
  end: string;
};

type State = {
  theme: Theme;
  sidebarOpen: boolean;
  userName: string | null;
  data: FitnessData[]; // Add fitness data
  range: DateRange; // Add date range
  selectedDate: string | null; // Add selected date
};

type Action =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_USERNAME"; payload: string | null }
  | { type: "SET_DATA"; payload: FitnessData[] } // Add data actions
  | { type: "SET_RANGE"; payload: DateRange }
  | { type: "SET_SELECTED_DATE"; payload: string | null };

// Initialize with some sample data or empty array
const initialState: State = {
  theme: "light",
  sidebarOpen: true,
  userName: "Aryan",
  data: [], // Initialize with empty array or sample data
  range: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 30 days ago
    end: new Date().toISOString().split("T")[0], // today
  },
  selectedDate: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_RANGE":
      return { ...state, range: action.payload };
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}

const StateCtx = createContext<State | undefined>(undefined);
const DispatchCtx = createContext<Dispatch<Action> | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
};

// Hooks
export const useAppState = () => {
  const ctx = useContext(StateCtx);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
};

export const useAppDispatch = () => {
  const ctx = useContext(DispatchCtx);
  if (!ctx) throw new Error("useAppDispatch must be used within AppProvider");
  return ctx;
};

// Convenience combo hook with helper functions
export const useApp = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  // Helper function to set selected date
  const setSelectedDate = (date: string | null) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: date });
  };

  // Helper function to set data
  const setData = (data: FitnessData[]) => {
    dispatch({ type: "SET_DATA", payload: data });
  };

  // Helper function to set range
  const setRange = (range: DateRange) => {
    dispatch({ type: "SET_RANGE", payload: range });
  };

  return {
    ...state,
    dispatch,
    setSelectedDate,
    setData,
    setRange,
  };
};
