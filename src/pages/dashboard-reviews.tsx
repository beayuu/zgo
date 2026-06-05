import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useListReviews } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardReviews() {
  const { data: reviews, isLoading } = useListReviews();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      
      <div className="space-y-4">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-4 w-1/5" />
                    <Skeleton className="h-16 w-full mt-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : reviews?.length ? reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">{review.userName}</h3>
                  <div className="text-sm text-slate-500 mb-3">{review.createdAt}</div>
                </div>
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-slate-200 text-slate-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-slate-700">{review.comment}</p>
            </CardContent>
          </Card>
        )) : (
          <div className="py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Star className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-900 mb-2">No reviews yet</p>
            <p>Share your experiences with other travelers after your trips.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
