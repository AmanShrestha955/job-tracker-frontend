import AddApplicationForm from "@/components/AddApplicationForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-500">Loading...</p>}>
      <AddApplicationForm />
    </Suspense>
  );
}
