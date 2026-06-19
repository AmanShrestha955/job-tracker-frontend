"use client";
import { DeleteConfirmCardProps } from "@/types/Components";
import { deleteApplication } from "@/utils/applicationApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteConfirmCard({ id, onClose }: DeleteConfirmCardProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => deleteApplication(id),
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      console.error(error);
      setError(error.message);
    },
  });

  const handleDelete = async () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-w-screen min-h-screen bg-black/50 dark:bg-black/70">
      <div className="flex flex-col gap-4 w-[90%] max-w-sm bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Delete application?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone. This will permanently delete the
          application.
        </p>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-md">
            {error}
          </p>
        )}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-800 dark:text-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={mutation.isPending}
            className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-60"
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
