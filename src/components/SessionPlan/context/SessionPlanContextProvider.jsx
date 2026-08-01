import { useEffect, useState } from "react";
import { SessionPlanContext } from "./sessionPlanContext";

const EMPTY_SCHOOL_INFO = { name: "", address: "", logo: "" };

const getStorageKey = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return `sessionPlan:${user?.username || "guest"}`;
  } catch {
    return "sessionPlan:guest";
  }
};

const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(getStorageKey());
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const SessionPlanContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadPersistedState()?.tasks ?? []);
  const [schoolInfo, setSchoolInfo] = useState(
    () => loadPersistedState()?.schoolInfo ?? EMPTY_SCHOOL_INFO,
  );
  const [selectedClass, setSelectedClass] = useState(
    () => loadPersistedState()?.selectedClass ?? "",
  );

  useEffect(() => {
    localStorage.setItem(
      getStorageKey(),
      JSON.stringify({ tasks, schoolInfo, selectedClass }),
    );
  }, [tasks, schoolInfo, selectedClass]);

  const resetSessionPlan = () => {
    setTasks([]);
    setSchoolInfo(EMPTY_SCHOOL_INFO);
  };

  const value = {
    tasks,
    setTasks,
    schoolInfo,
    setSchoolInfo,
    selectedClass,
    setSelectedClass,
    resetSessionPlan,
  };

  return (
    <SessionPlanContext.Provider value={value}>
      {children}
    </SessionPlanContext.Provider>
  );
};

export default SessionPlanContextProvider;
