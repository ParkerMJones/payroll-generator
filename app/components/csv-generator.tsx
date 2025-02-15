"use client";
import type { DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import { generateCSV } from "../utils";

interface CSVGeneratorProps {
  dateRange: DateRange | undefined;
}

export default function CSVGenerator({ dateRange }: CSVGeneratorProps) {
  const handleGenerateCSV = () => {
    if (dateRange?.from && dateRange?.to) {
      generateCSV(dateRange.from, dateRange.to);
    }
  };

  return (
    <div className="mt-4">
      <Button
        onClick={handleGenerateCSV}
        disabled={!dateRange?.from || !dateRange?.to}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
      >
        Generate CSV
      </Button>
    </div>
  );
}
