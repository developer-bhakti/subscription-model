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

export const isSuperAdmin = (user) => user?.role === ROLES.SUPER_ADMIN;

export const isAnyAdmin = (user) => ADMIN_ROLES.includes(user?.role);
