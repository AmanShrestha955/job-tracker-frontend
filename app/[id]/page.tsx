import { ApplicationDetailCard } from "@/components/ApplicationDetailCard";

export default async function Page({ params }: { params: { id: number } }) {
  const { id } = await params;
  return <ApplicationDetailCard id={id} />;
}
