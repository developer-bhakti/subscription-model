import { format, isWeekend } from "date-fns";
import { holidays } from "./holidays";

const getWorkingDays = (startDate, endDate, vacations) => {
  let current = new Date(startDate);
  let workingDays = [];

  while (current <= new Date(endDate)) {
    const formattedDate = format(current, "yyyy-MM-dd");

    const isVacationDay = vacations.some(
      (vac) => formattedDate >= vac.start && formattedDate <= vac.end,
    );

    if (
      !isWeekend(current) &&
      !holidays.includes(formattedDate) &&
      !isVacationDay
    ) {
      workingDays.push(formattedDate);
    }
    current.setDate(current.getDate() + 1);
  }
  return workingDays;
};

export default getWorkingDays;
