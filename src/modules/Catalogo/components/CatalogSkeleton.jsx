import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const CatalogSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar skeleton */}{" "}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Skeleton className="h-9 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters sidebar skeleton */}
        <div className="hidden md:block">
          <div className="rounded-lg border bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-6 w-20" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <div className="space-y-2 pt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <div className="space-y-4 pt-2">
                  <Skeleton className="h-5 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <div className="space-y-2 pt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-sm" />
                      <Skeleton className="h-4 w-full max-w-[100px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product grid skeleton */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-1">
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="mb-1 h-5 w-full" />
                  <Skeleton className="mb-4 h-5 w-3/4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
