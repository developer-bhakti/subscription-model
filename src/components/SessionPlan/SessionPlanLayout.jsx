import { Outlet } from "react-router-dom";
import SessionPlanContextProvider from "./context/SessionPlanContextProvider";
import "./sessionPlan.css";

const SessionPlanLayout = () => {
  return (
    <SessionPlanContextProvider>
      <div className="session-plan-app">
        <Outlet />
      </div>
    </SessionPlanContextProvider>
  );
};

export default SessionPlanLayout;
