// components/DropdownButton.tsx
"use client";

import { useState } from "react";
import type { Status } from "@/types/ApplicationApi";

type DropdownButtonProps = {
  onSelect: (status: Status | undefined) => void;
};

const STATUS_OPTIONS: Status[] = [
  "Applied",
  "Interviewing",
  "Offer",
  "Rejected",
];

export function DropdownButton({ onSelect }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Status | undefined>(undefined);

  const handleSelect = (status: Status | undefined) => {
    setSelected(status);
    onSelect(status);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      >
        {selected ?? "Filter by Status"}
        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden text-sm">
          <li
            onClick={() => handleSelect(undefined)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            All
          </li>
          {STATUS_OPTIONS.map((status) => (
            <li
              key={status}
              onClick={() => handleSelect(status)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                selected === status
                  ? "font-semibold text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
