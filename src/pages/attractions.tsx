import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useListAttractions } from "@workspace/api-client-react";
import { MapPin, Star, Filter, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Attractions() {
  const { data: attractions, isLoading } = useListAttractions();

  return (
    <AppLayout>
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Attractions</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Zamboanga Attractions</h1>
          <p className="text-slate-600">Discover and book the best experiences in the city.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <Card className="sticky top-24 border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 font-bold text-lg mb-6 border-b pb-4">
                  <Filter className="h-5 w-5 text-primary" /> Filters
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {['Island Hopping', 'City Tour', 'Nature', 'Culture', 'Water Sports'].map(cat => (
                      <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" className="text-primary focus:ring-primary" /> Under ₱1,000
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" className="text-primary focus:ring-primary" /> ₱1,000 - ₱3,000
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" className="text-primary focus:ring-primary" /> ₱3,000 - ₱5,000
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" className="text-primary focus:ring-primary" /> Over ₱5,000
                    </label>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <Skeleton className="h-56 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : attractions?.map(attraction => (
                <Link key={attraction.id} href={`/attractions/${attraction.id}`}>
                  <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-slate-200">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={attraction.imageUrl} 
                        alt={attraction.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star className="h-3 w-3 fill-accent text-accent" /> {attraction.rating.toFixed(1)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{attraction.category}</div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">{attraction.name}</h3>
                      <div className="flex items-center text-sm text-slate-500 mb-4">
                        <MapPin className="h-3.5 w-3.5 mr-1" /> {attraction.location}
                      </div>
                      <div className="flex items-center justify-between mt-auto border-t pt-4">
                        <div>
                          <div className="text-xs text-slate-500">From</div>
                          <div className="font-bold text-xl text-slate-900">₱{attraction.price}</div>
                        </div>
                        <Button size="sm" className="rounded-full shadow-sm">Book</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
