"use client";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import type { DateRange } from "react-day-picker";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  isWeekend,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calculateTotalHours } from "../utils";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface HighlightedCalendarProps {
  dateRange: DateRange | undefined;
}

export default function HighlightedCalendar({
  dateRange,
}: HighlightedCalendarProps) {
  const events =
    dateRange?.from && dateRange?.to
      ? (Array.from(
          {
            length:
              (dateRange.to.getTime() - dateRange.from.getTime()) /
                (1000 * 60 * 60 * 24) +
              1,
          },
          (_, i) => {
            const date = new Date(
              dateRange?.from
                ? dateRange.from.getTime() + i * (1000 * 60 * 60 * 24)
                : 0
            );
            return isWeekend(date)
              ? null
              : {
                  start: date,
                  end: date,
                  title: "9.5h",
                  allDay: true,
                };
          }
        ).filter(Boolean) as {
          start: Date;
          end: Date;
          title: string;
          allDay: boolean;
        }[])
      : [];

  const totalHours =
    dateRange?.from && dateRange?.to
      ? calculateTotalHours(dateRange.from, dateRange.to)
      : 0;

  const today = new Date();

  return (
    <div className="bg-white overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#497174]">
          Total Hours{" "}
          {dateRange?.from && dateRange?.to
            ? `${format(dateRange.from, "M/d")} - ${format(
                dateRange.to,
                "M/d"
              )}`
            : ""}
          : <span className="text-[#EB6440]">{totalHours.toFixed(1)}</span>
        </h2>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event: { start: Date }) => event.start}
        endAccessor={(event: { start: Date; end: Date }) => event.end}
        style={{
          height: "calc(100vh - 200px)",
          color: "#243642",
          textAlign: "right",
          cursor: "default",
        }}
        views={["month"]}
        defaultView={Views.MONTH}
        toolbar={true}
        components={{
          toolbar: CustomToolbar,
        }}
        date={dateRange?.from}
        onNavigate={() => {}}
        eventPropGetter={(
          event: { start: Date; end: Date; title: string; allDay: boolean },
          start: Date
        ) => ({
          style: {
            backgroundColor: "transparent",
            color:
              dateRange?.from &&
              dateRange?.to &&
              isWithinInterval(start, {
                start: dateRange.from,
                end: dateRange.to,
              })
                ? "white"
                : "white",
            border: "none",
            textAlign: "right",
            fontSize: "14px",
          },
        })}
        dayPropGetter={(date: string | number | Date) => ({
          style: {
            textAlign: "right",
            backgroundColor: isSameDay(date, today)
              ? "#EB6440"
              : dateRange?.from &&
                dateRange?.to &&
                !isWeekend(date) &&
                isWithinInterval(date, {
                  start: dateRange.from,
                  end: dateRange.to,
                })
              ? "#497174"
              : isWeekend(date)
              ? "#D6E4E5"
              : undefined,
            color: isSameDay(date, today)
              ? "white"
              : dateRange?.from &&
                dateRange?.to &&
                !isWeekend(date) &&
                isWithinInterval(date, {
                  start: dateRange.from,
                  end: dateRange.to,
                })
              ? "#EB6440"
              : "white",
          },
        })}
      />
    </div>
  );
}

const CustomToolbar = ({ label }: { label: string }) => (
  <div className="rbc-toolbar p-3">
    <span className="rbc-toolbar-label text-xl font-semibold text-[#497174]">
      {label}
    </span>
  </div>
);
