import { createContext, useContext } from "react";

export const SessionPlanContext = createContext();
export const useSessionPlan = () => useContext(SessionPlanContext);
