// Roles used across the app.
//   superadmin - owns everything, creates admins, sees every row
//   admin      - owns only the users it created, sees nothing else
//   user       - a subscriber
export const ROLES = {
  SUPER_ADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user",
};

export const ADMIN_ROLES = [ROLES.SUPER_ADMIN, ROLES.ADMIN];

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// A subscriber is either a school or a parent. (A school is stored as "teacher", the value
// existing accounts already carry, so only the label people see says School.) This is
// deliberately separate from
// `role` so the existing superadmin / admin / user roles keep working untouched.
export const ACCOUNT_TYPES = {
  TEACHER: "teacher",
  PARENT: "parent",
};

// Accounts created before parent logins existed carry no account_type, so they count as
// school accounts and only an explicit "parent" is treated as one. The type decides which
// tile an account signs in with and how the dashboard greets it; both see the same modules.
export const getAccountType = (user) =>
  user?.account_type === ACCOUNT_TYPES.PARENT
    ? ACCOUNT_TYPES.PARENT
    : ACCOUNT_TYPES.TEACHER;

export const isSuperAdmin = (user) => user?.role === ROLES.SUPER_ADMIN;

export const isAnyAdmin = (user) => ADMIN_ROLES.includes(user?.role);
