"use client";

import { DropdownButton } from "@/components/DropdowButton";
import {
  CreateApplicationFormData,
  Job_Type,
  Status,
} from "@/types/ApplicationApi";
import {
  createApplication,
  getApplicationByIdData,
  updateApplication,
} from "@/utils/applicationApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const JOB_TYPES: Job_Type[] = ["Internship", "Full-time", "Part-time"];
const STATUSES: Status[] = ["Applied", "Interviewing", "Offer", "Rejected"];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? Number(idParam) : undefined;
  const isEditMode = id !== undefined;

  const [submitError, setSubmitError] = useState("");
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateApplicationFormData>();

  const { data: existingData, isLoading } = useQuery({
    queryKey: ["getApplicationById", id],
    queryFn: () => getApplicationByIdData(id!),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (existingData) {
      reset({
        company_name: existingData.company_name,
        job_title: existingData.job_title,
        job_type: existingData.job_type,
        status: existingData.status,
        applied_date: existingData.applied_date.split("T")[0], // strip time for <input type="date">
        notes: existingData.notes,
      });
    }
  }, [existingData, reset]);

  const createMutation = useMutation({
    mutationFn: (data: CreateApplicationFormData) => createApplication(data),
    onSuccess: () => {
      reset();
      router.back();
    },
    onError: (error) => setSubmitError(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: (data: CreateApplicationFormData) =>
      updateApplication(id!, data),
    onSuccess: () => {
      reset();
      router.back();
    },
    onError: (error) => setSubmitError(error.message),
  });

  const onSubmit = (data: CreateApplicationFormData) => {
    setSubmitError("");
    console.log(data);
    if (isEditMode) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isEditMode && isLoading)
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    );

  return (
    <div className="flex flex-col gap-10 justify-center items-center my-auto">
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
          {isEditMode ? "Update Application" : "Add Application"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%] max-w-150"
      >
        <div className="flex flex-col gap-1">
          <input
            type="text"
            {...register("company_name", {
              required: "Company name is required",
              minLength: {
                value: 2,
                message: "Company name must be at least 2 characters long",
              },
            })}
            className="px-4 py-3 text-sm bg-gray-100 dark:bg-gray-900 rounded-lg outline-none"
            placeholder="Company name"
          />
          {errors.company_name && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.company_name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            {...register("job_title", {
              required: "Job title is required",
            })}
            className="px-4 py-3 text-sm bg-gray-100 dark:bg-gray-900 rounded-lg outline-none"
            placeholder="Job title"
          />
          {errors.job_title && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.job_title.message}
            </p>
          )}
        </div>
        <div className="flex flex-row justify-between gap-3 flex-wrap">
          <div className="flex flex-col flex-1 gap-1">
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <DropdownButton
                  options={STATUSES}
                  value={field.value}
                  onSelect={field.onChange}
                  placeholder="Select status"
                  fullWidth
                />
              )}
            />
            {errors.status && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <Controller
              name="job_type"
              control={control}
              rules={{ required: "Job type is required" }}
              render={({ field }) => (
                <DropdownButton
                  options={JOB_TYPES}
                  value={field.value}
                  onSelect={field.onChange}
                  placeholder="Select job type"
                  fullWidth
                />
              )}
            />
            {errors.job_type && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.job_type.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="date"
            {...register("applied_date", {
              required: "Applied date is required",
            })}
            className="px-4 py-3 text-sm bg-gray-100 dark:bg-gray-900 rounded-lg outline-none scheme-light dark:scheme-dark"
          />
          {errors.applied_date && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.applied_date.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            {...register("notes")}
            className="px-4 py-3 text-sm bg-gray-100 dark:bg-gray-900 rounded-lg outline-none resize-none"
            placeholder="Notes (optional)"
            rows={3}
          />
        </div>

        {submitError && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-md">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-3 text-sm font-medium bg-gray-100 dark:bg-gray-900 shadow rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          {isPending ? "Saving..." : isEditMode ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
