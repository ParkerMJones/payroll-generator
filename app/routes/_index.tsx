import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import CSVGenerator from "~/components/csv-generator";
import DateRangePicker from "~/components/date-range-picker";
import HighlightedCalendar from "~/components/highlighted-calendar";
import "~/calendar-styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Parker's Payroll Generator" },
    { name: "description", content: "Parker's Payroll Generator" },
  ];
};

export default function Home() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#497174]">
        Parker&apos;s Payroll Generator
      </h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/3">
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          <CSVGenerator dateRange={dateRange} />
        </div>
        <div className="md:w-2/3">
          <HighlightedCalendar dateRange={dateRange} />
        </div>
      </div>
    </main>
  );
}
