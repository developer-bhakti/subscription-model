import { Navigate } from "react-router-dom";
import { getCurrentUser, isParent } from "../services/auth";

// Wraps the modules a parent account must not reach. Hiding a section from the sidebar
// only hides the link — this is what makes typing the URL by hand land a parent back on
// their own dashboard instead of inside a teacher-only tool.
const TeacherOnlyRoute = ({ children }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (isParent(user)) {
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default TeacherOnlyRoute;
