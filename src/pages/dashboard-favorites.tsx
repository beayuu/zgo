import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useListFavorites } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Heart } from "lucide-react";
import { Link } from "wouter";

export default function DashboardFavorites() {
  const { data: favorites, isLoading } = useListFavorites();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Saved Favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full">Loading...</div>
        ) : favorites?.length ? favorites.map((attraction) => (
          <Card key={attraction.id} className="group overflow-hidden relative">
            <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md hover:scale-110 transition-transform">
              <Heart className="h-4 w-4 fill-current" />
            </button>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={attraction.imageUrl} 
                alt={attraction.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-1 text-sm font-bold text-accent mb-1">
                <Star className="h-3 w-3 fill-current" /> {attraction.rating.toFixed(1)}
              </div>
              <h3 className="font-bold text-lg mb-1 truncate">{attraction.name}</h3>
              <div className="flex items-center text-sm text-slate-500 mb-4">
                <MapPin className="h-3 w-3 mr-1" /> {attraction.location}
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="font-bold text-lg text-slate-900">₱{attraction.price}</div>
                <Link href={`/attractions/${attraction.id}`}>
                  <Button size="sm">View</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-900 mb-2">No favorites yet</p>
            <p className="mb-4">Start saving your favorite attractions for later.</p>
            <Link href="/attractions"><Button>Browse Attractions</Button></Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
