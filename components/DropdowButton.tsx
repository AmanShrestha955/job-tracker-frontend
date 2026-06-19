"use client";

import { DropdownButtonProps } from "@/types/Search";
import { useState } from "react";

export function DropdownButton<T extends string>({
  options,
  value,
  onSelect,
  placeholder,
  showAllOption = false,
  fullWidth = false,
}: DropdownButtonProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: T | undefined) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex ${fullWidth ? "w-full" : ""} items-center gap-2 px-4 py-3 text-sm font-medium justify-between bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors`}
      >
        {value ?? placeholder}
        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul
          className={`absolute ${fullWidth ? "w-full" : ""} z-10 mt-1 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden text-sm`}
        >
          {showAllOption && (
            <li
              onClick={() => handleSelect(undefined)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
            >
              All
            </li>
          )}
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                value === option
                  ? "font-semibold text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
