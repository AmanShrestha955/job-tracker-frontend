"use client";

import { getApplicationByIdData } from "@/utils/applicationApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteConfirmCard } from "./DeleteConfirmCard";

export function ApplicationDetailCard({ id }: { id: number }) {
  const [isdelete, setIsDelete] = useState(false);
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["getApplicationById"],
    queryFn: () => getApplicationByIdData(id),
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (isLoading)
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    );
  return (
    <div className="flex flex-col min-h-screen w-full gap-10 items-center justify-center my-auto">
      {data && isdelete === true && (
        <DeleteConfirmCard id={data.id} onClose={() => setIsDelete(false)} />
      )}
      <div className="flex flex-col items-start w-[90%] lg:max-w-150">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 duration-150 transition-colors text-gray-800 dark:text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
      </div>
      <div className="flex flex-row items-center justify-between w-[90%] lg:max-w-150 mx-auto mt-8 lg:mt-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Application Details
        </h1>
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        {data && (
          <div className="flex flex-col  w-[90%] lg:max-w-150 bg-gray-100 dark:bg-gray-900 p-8 shadow rounded-lg gap-2">
            <h1 className="text-xl first-letter:uppercase lowercase font-semibold">
              {data.company_name}
            </h1>
            <div className="flex-1 flex flex-row justify-between items-center gap-3">
              <h2 className="text-sm first-letter:uppercase lowercase">
                {data.job_title}
              </h2>
              <p className="text-sm">{data.applied_date.split("T")[0]}</p>
            </div>
            <div className="flex-1 flex flex-row justify-between items-center gap-3">
              <h2 className="text-sm capitalize">{data.job_type}</h2>
              <p className="text-sm capitalize">{data.status}</p>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-1">
              <h2 className="text-sm capitalize">note:</h2>
              <p className="text-sm first-letter:uppercase lowercase">
                {data.notes}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row justify-between items-start w-[90%] lg:max-w-150 shadow gap-6">
        <button
          onClick={() => router.push(`/add-application?id=${data?.id}`)}
          className="flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 duration-150 transition-colors text-gray-800 dark:text-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => setIsDelete(true)}
          className="flex flex-1 items-center justify-center gap-2 px-5 py-3 text-sm font-medium bg-red-600 dark:bg-red-700 shadow rounded-lg hover:bg-red-500 dark:hover:bg-red-600 duration-150 transition-colors text-white dark:text-gray-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
