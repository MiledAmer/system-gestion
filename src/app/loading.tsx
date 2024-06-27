import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="w-full h-full grid grid-cols-3 justify-center p-8 ">
      <Skeleton className="w-full h-16 col-span-3 mb-8" />
      {Array(3)
        .fill("")
        .map((_, index) => (
          <div className="flex flex-col space-y-3 w-full" key={index}>
            <div className="space-y-2">
              <Skeleton className="h-4 w-8/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>
            <Skeleton className="w-11/12 h-[600px] rounded-xl" />
          </div>
        ))}
    </div>
  );
}

export default Loading;
