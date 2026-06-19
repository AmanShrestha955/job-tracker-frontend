"use client";

import { DropdownButton } from "@/components/DropdowButton";
import { SearchBar } from "@/components/SearchBar";
import { SearchAndFilterParams } from "@/types/Search";
import { getAllApplicationData } from "@/utils/applicationApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const [params, setParams] = useState<SearchAndFilterParams>({ search: "" });
  const { data, isLoading } = useQuery({
    queryKey: ["getAllApplications", params],
    queryFn: () => getAllApplicationData({ limit: 10, offset: 0, ...params }),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="flex flex-col flex-wrap w-full justify-center min-h-screen lg:pt-16 lg:px-16 dark:bg-background bg-zinc-50 font-sans">
      <div className="flex flex-row gap-5 justify-center items-center">
        <SearchBar
          onSearch={(query) => {
            setParams((prev) => ({ ...prev, search: query }));
          }}
        />
        <DropdownButton
          onSelect={(status) => {
            setParams((prev) => ({ ...prev, status }));
          }}
        />
      </div>
      <div className="flex flex-row flex-wrap w-full justify-center gap-10">
        {data &&
          data.applications.map((item, index) => (
            <div
              key={index}
              className="flex flex-col  dark:bg-gray-900 w-[90%] xl:max-w-150 bg-gray-100 p-8 shadow rounded-lg gap-2"
            >
              <h1 className="text-2xl"> {item.company_name}</h1>
              <div className="flex-1 flex flex-row justify-between gap-3">
                <h2 className="text-lg">{item.job_title}</h2>
                <p>{item.applied_date.split("T")[0]}</p>
              </div>
              <div className="flex-1 flex flex-row justify-between">
                <p>{item.job_type}</p>
                <p>{item.status}</p>
              </div>
              <p>{item.notes}</p>
            </div>
          ))}
      </div>
      {/* <main className="flex flex-1 w-screen flex-col items-end justify-between py-32 px-16 bg-white sm:items-start"></main> */}
    </div>
  );
}
