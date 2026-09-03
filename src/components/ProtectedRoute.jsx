import { Navigate } from "react-router-dom";
import { getCurrentUser, isAnyAdmin } from "../services/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Send them back to the area their own role is allowed into.
    return <Navigate to={isAnyAdmin(user) ? "/admin" : "/user"} replace />;
  }

  return children;
};

export default ProtectedRoute;
