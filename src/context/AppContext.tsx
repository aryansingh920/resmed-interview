import React, { createContext, useReducer, useContext, Dispatch } from "react";

type Theme = "light" | "dark";

type State = {
  theme: Theme;
  sidebarOpen: boolean;
  userName: string | null;
};

type Action =
  | { type: "TOGGLE_THEME" }
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_USERNAME"; payload: string | null };

const initialState: State = {
  theme: "light",
  sidebarOpen: true,
  userName: "Aryan",
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

// Convenience combo hook
export const useApp = () => {
  return { ...useAppState(), dispatch: useAppDispatch() };
};
