import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListPackages } from "@workspace/api-client-react";
import { Star, Clock, Check, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Packages() {
  const { data: packages, isLoading } = useListPackages();

  return (
    <AppLayout>
      <div className="bg-slate-900 text-white border-b py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Tour Packages</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">Curated experiences and bundled tours to make the most of your Zamboanga adventure.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : packages?.length ? packages.map(pkg => (
            <Card key={pkg.id} className="group overflow-hidden flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {pkg.savingsPercent && (
                  <div className="absolute top-4 left-4 bg-destructive text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    Save {pkg.savingsPercent}%
                  </div>
                )}
              </div>
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-sm text-slate-500">
                  <span className="flex items-center text-amber-500 font-medium">
                    <Star className="h-4 w-4 fill-current mr-1" /> {pkg.rating.toFixed(1)}
                  </span>
                  <span>({pkg.reviewCount} reviews)</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {pkg.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pkg.name}</h3>
                <p className="text-slate-600 mb-6 flex-1">{pkg.description}</p>
                
                <div className="mb-6 space-y-2">
                  {pkg.highlights?.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto border-t pt-4">
                  <div>
                    {pkg.originalPrice && (
                      <div className="text-sm text-slate-400 line-through">₱{pkg.originalPrice}</div>
                    )}
                    <div className="text-2xl font-bold text-slate-900">₱{pkg.price}</div>
                  </div>
                  <Link href={`/checkout?packageId=${pkg.id}`}>
                    <Button size="lg" className="rounded-full shadow-md">Book Now</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-500">
              <p className="text-xl mb-4">No packages available at the moment.</p>
              <Button variant="outline">Browse Attractions</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
