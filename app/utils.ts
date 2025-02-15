import {
  startOfMonth,
  endOfMonth,
  addDays,
  format,
  isWeekend,
  eachDayOfInterval,
  differenceInBusinessDays,
} from "date-fns";
import type { DateRange } from "react-day-picker";
import Papa from "papaparse";

export function getDefaultDateRange(): DateRange {
  const today = new Date();
  const dayOfMonth = today.getDate();

  if (dayOfMonth <= 15) {
    return {
      from: startOfMonth(today),
      to: addDays(startOfMonth(today), 14),
    };
  } else {
    return {
      from: addDays(startOfMonth(today), 15),
      to: endOfMonth(today),
    };
  }
}

export function getNextImportId(startDate: Date): number {
  const referenceDate = new Date(2025, 2, 31); // March 31, 2025
  const businessDaysDifference = differenceInBusinessDays(
    startDate,
    referenceDate
  );
  return 186 + businessDaysDifference + 1;
}

export function generateCSV(startDate: Date, endDate: Date) {
  const data = [
    [
      "Rippling Emp No",
      "Employee Name",
      "Import ID",
      "Start Time",
      "End Time",
      "Pay Period Start Date",
      "Pay Period End Date",
      "Job Code",
      "Comment",
      "Break Type",
      "Break Start Time",
      "Break End Time",
    ],
  ];

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
  let importId = getNextImportId(startDate);

  dateRange.forEach((date) => {
    if (!isWeekend(date)) {
      data.push([
        "7",
        "Parker Jones",
        importId.toString(),
        format(date, "yyyy-MM-dd'T'08:45:00xxx"),
        format(date, "yyyy-MM-dd'T'18:45:00xxx"),
        format(startDate, "MM/dd/yyyy"),
        format(endDate, "MM/dd/yyyy"),
        "",
        "",
        "Meal",
        format(date, "yyyy-MM-dd'T'12:00:00xxx"),
        format(date, "yyyy-MM-dd'T'12:30:00xxx"),
      ]);
      importId++;
    }
  });

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `timesheet_${format(startDate, "yyyyMMdd")}_${format(
        endDate,
        "yyyyMMdd"
      )}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function calculateTotalHours(startDate: Date, endDate: Date): number {
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekdays = days.filter((day) => !isWeekend(day)).length;
  return weekdays * 9.5;
}
