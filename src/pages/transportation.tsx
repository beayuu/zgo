import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListTransportation } from "@workspace/api-client-react";
import { Users, Briefcase, Car, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export default function Transportation() {
  const { data: transports, isLoading } = useListTransportation();

  return (
    <AppLayout>
      <div className="bg-slate-50 border-b py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Transportation Services</h1>
          <p className="text-slate-600 max-w-2xl text-lg">Reliable airport transfers, van rentals, and island shuttles in Zamboanga.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-1/3 h-48 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : transports?.length ? transports.map(transport => (
            <Card key={transport.id} className="overflow-hidden flex flex-col md:flex-row group hover:border-primary/50 transition-colors">
              <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                <img 
                  src={transport.imageUrl} 
                  alt={transport.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary uppercase shadow-sm">
                  {transport.type}
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{transport.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{transport.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-700 mb-6">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span>Up to {transport.capacity} pax</span>
                    </div>
                    {transport.features?.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-md">
                        <ShieldCheck className="h-4 w-4 text-slate-500" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Starting from</span>
                    <span className="text-xl font-bold text-slate-900">₱{transport.price}</span>
                  </div>
                  <Link href={`/checkout?transportationId=${transport.id}`}>
                    <Button>Book Vehicle</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-500">
              No transportation services available at the moment.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
