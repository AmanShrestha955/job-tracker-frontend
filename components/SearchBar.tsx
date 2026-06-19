"use client";

import { SearchBarProps } from "@/types/Search";
import React, { useState } from "react";

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center w-[90%] lg:max-w-150 my-6 shadow rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search by company, role..."
        className="flex-1 px-4 py-3 text-sm bg-transparent outline-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
      />
      <button
        onClick={handleSearch}
        className="px-5 py-3 text-sm font-medium bg-gray-800 text-white dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
      >
        Search
      </button>
    </div>
  );
}
