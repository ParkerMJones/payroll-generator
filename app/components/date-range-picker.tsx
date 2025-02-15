"use client";

import type React from "react";
import type { DateRange } from "react-day-picker";
import { addDays, endOfMonth, isAfter, isBefore, startOfMonth } from "date-fns";
import { Calendar } from "./ui/calendar";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export default function DateRangePicker({
  dateRange,
  setDateRange,
}: DateRangePickerProps) {
  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      const from = range.from;
      let to = range.to || addDays(from, 14);

      if (
        isAfter(from, startOfMonth(from)) &&
        isBefore(from, endOfMonth(from))
      ) {
        to = endOfMonth(from);
      } else if (isAfter(from, startOfMonth(from))) {
        to = endOfMonth(addDays(from, 1));
      }

      setDateRange({ from, to });
    } else {
      setDateRange(undefined);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-[#497174]">
        Select Date Range
      </h2>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={handleSelect}
        numberOfMonths={1}
        modifiers={{ today: new Date() }}
        modifiersStyles={{
          today: { color: "white", backgroundColor: "#EB6440" },
        }}
        className="rounded-md shadow-sm text-black"
      />
    </div>
  );
}
