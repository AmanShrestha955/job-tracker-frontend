"use client";

import { DropdownButton } from "@/components/DropdowButton";
import { SearchBar } from "@/components/SearchBar";
import { Status } from "@/types/ApplicationApi";
import { SearchAndFilterParams } from "@/types/Search";
import { getAllApplicationData } from "@/utils/applicationApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LIMIT = 6;

export default function Home() {
  const router = useRouter();
  const [params, setParams] = useState<SearchAndFilterParams>({ search: "" });
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { data, isLoading } = useQuery({
    queryKey: ["getAllApplications", params, page],
    queryFn: () =>
      getAllApplicationData({ limit: LIMIT, offset: offset, ...params }),
  });
  const statusOption: Status[] = [
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
  ];

  const updateParams = (
    updater: (prev: SearchAndFilterParams) => SearchAndFilterParams,
  ) => {
    setParams(updater);
    setPage(1);
  };

  return (
    <div className="flex flex-col flex-wrap w-full justify-center min-h-screen lg:pt-16 lg:px-16 dark:bg-background bg-zinc-50 font-sans">
      <div className="flex flex-row items-center justify-between w-[95%] mx-auto mt-8 lg:mt-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Applications
        </h1>
        <button
          className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 duration-150 transition-colors text-gray-800 dark:text-gray-100"
          onClick={() => router.push("/add-application")}
        >
          <p>+</p>
          Add
        </button>
      </div>
      <div className="flex flex-row flex-wrap gap-2 justify-center lg:items-center w-[95%] my-8 mx-auto">
        <SearchBar
          onSearch={(query) => {
            updateParams((prev) => ({ ...prev, search: query }));
          }}
        />
        <DropdownButton
          options={statusOption}
          value={params.status}
          onSelect={(status) => {
            updateParams((prev) => ({ ...prev, status }));
          }}
          placeholder="Filter by Status"
          showAllOption
        />
      </div>
      <div className="flex flex-row flex-wrap w-full justify-center gap-10">
        {isLoading && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
        )}
        {data && data.applications.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 w-full py-20">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {params.search || params.status
                ? "No applications match your search"
                : "No applications yet"}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {params.search || params.status
                ? "Try adjusting your filters"
                : 'Click "Add" to create your first application'}
            </p>
          </div>
        )}
        {data &&
          data.applications.map((item, index) => (
            <div
              key={index}
              className="flex flex-col  w-[90%] lg:max-w-150 bg-gray-100 dark:bg-gray-900 p-8 shadow rounded-lg gap-2 hover:scale-110 cursor-pointer duration-200 transition-all"
              onClick={() => {
                router.push(`/${item.id}`);
              }}
            >
              <h1 className="text-xl font-semibold"> {item.company_name}</h1>
              <div className="flex-1 flex flex-row justify-between items-center gap-3">
                <h2 className="text-md">{item.job_title}</h2>
                <p className="text-sm">{item.applied_date.split("T")[0]}</p>
              </div>
            </div>
          ))}
      </div>
      {data && data.totalPages > 1 && (
        <div className="flex flex-row items-center justify-center gap-4 my-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {data.currentPage} of {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
