const DAY_MS = 24 * 60 * 60 * 1000;

// A subscription is "expiring soon" for its last 30 days.
export const EXPIRING_SOON_DAYS = 30;

// Where a subscription stands: "active", "soon" (ends within 30 days) or "expired". Returns
// null when there is no end date, as for an admin account.
export function subscriptionStatus(endDate, now) {
  if (!endDate) return null;

  const end = new Date(endDate).getTime();

  if (Number.isNaN(end)) return null;
  if (end < now) return "expired";
  if (end - now <= EXPIRING_SOON_DAYS * DAY_MS) return "soon";

  return "active";
}
