import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center p-8 ">
      <div className="flex flex-col space-y-3 w-full ">
        <div className="space-y-2">
          <Skeleton className="h-4 w-8/12" />
          <Skeleton className="h-4 w-10/12" />
        </div>
        <Skeleton className="w-11/12 h-[600px] rounded-xl" />
      </div>
    </div>
  );
}

export default Loading;
