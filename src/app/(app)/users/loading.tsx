import { Skeleton } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <>
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-[420px] rounded-lg" />
    </>
  );
}
