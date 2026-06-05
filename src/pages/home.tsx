import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/AppLayout";
import { Search, MapPin, Calendar, Users, ChevronRight, Star } from "lucide-react";
import { Link } from "wouter";
import { useListFeaturedAttractions } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: featuredAttractions, isLoading } = useListFeaturedAttractions();

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-vintas.png" 
            alt="Zamboanga Vintas" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 mt-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Discover the <span className="text-primary">Colors</span> of Zamboanga.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
              Book unforgettable tours, island hopping, and authentic local experiences in Asia's Latin City.
            </p>
            
            {/* Search Widget */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="flex-1 flex items-center px-4 py-3 bg-muted/30 rounded-xl">
                <MapPin className="text-primary mr-3 h-5 w-5" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Destination</div>
                  <input type="text" placeholder="Where do you want to go?" className="w-full bg-transparent border-none focus:outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground/70" />
                </div>
              </div>
              <div className="w-px bg-border hidden md:block mx-1 my-2"></div>
              <div className="flex-1 flex items-center px-4 py-3 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                <Calendar className="text-primary mr-3 h-5 w-5" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dates</div>
                  <div className="text-sm font-medium text-foreground">Add dates</div>
                </div>
              </div>
              <div className="w-px bg-border hidden md:block mx-1 my-2"></div>
              <div className="flex-1 flex items-center px-4 py-3 bg-muted/30 rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                <Users className="text-primary mr-3 h-5 w-5" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Guests</div>
                  <div className="text-sm font-medium text-foreground">1 Guest</div>
                </div>
              </div>
              <Button size="lg" className="md:w-32 h-14 rounded-xl text-base shadow-lg shadow-primary/30">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="container mx-auto px-4 py-12 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {["Island Hopping", "City Tours", "Food Trips", "Nature & Parks", "Culture", "Transfers"].map((cat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-center">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Attractions */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Must-See Attractions</h2>
            <p className="text-muted-foreground">The most booked experiences in Zamboanga</p>
          </div>
          <Link href="/attractions">
            <Button variant="ghost" className="hidden md:flex group">
              View all <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-5 w-1/4 mt-2" />
              </div>
            ))
          ) : featuredAttractions && featuredAttractions.length > 0 ? (
            featuredAttractions.slice(0, 4).map((attraction) => (
              <Link key={attraction.id} href={`/attractions/${attraction.id}`}>
                <div className="group rounded-2xl overflow-hidden cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={attraction.imageUrl} 
                      alt={attraction.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" /> {attraction.rating.toFixed(1)} <span className="text-slate-500 font-normal">({attraction.reviewCount})</span>
                    </div>
                  </div>
                  <div className="pt-4 pb-2">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">{attraction.category}</div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{attraction.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" /> {attraction.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {attraction.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through mr-2">₱{attraction.originalPrice}</span>
                        )}
                        <span className="font-bold text-lg text-secondary">₱{attraction.price}</span>
                      </div>
                      <Button size="sm" className="rounded-full shadow-sm">Book</Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No featured attractions found.
            </div>
          )}
        </div>
      </section>

      {/* Featured Destinations Row */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold mb-10 text-center">Explore by Destination</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="relative h-[350px] rounded-2xl overflow-hidden group cursor-pointer">
               <img src="/santa-cruz.png" alt="Santa Cruz Island" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <h3 className="text-3xl font-bold text-white mb-2">Santa Cruz Island</h3>
                 <p className="text-white/80 mb-4">Famous for its pink coralline sand and crystal clear waters.</p>
                 <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full">View Tours</Button>
               </div>
             </div>
             <div className="relative h-[350px] rounded-2xl overflow-hidden group cursor-pointer">
               <img src="/once-islas.png" alt="Once Islas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <h3 className="text-3xl font-bold text-white mb-2">Once Islas</h3>
                 <p className="text-white/80 mb-4">Eleven pristine islands offering the ultimate eco-tourism experience.</p>
                 <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full">View Tours</Button>
               </div>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
               <img src="/fort-pilar.png" alt="Fort Pilar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                 <h3 className="text-xl font-bold text-white mb-1">Fort Pilar</h3>
                 <p className="text-sm text-white/80">Historical Shrine</p>
               </div>
             </div>
             <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
               <img src="/pasonanca.png" alt="Pasonanca Park" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                 <h3 className="text-xl font-bold text-white mb-1">Pasonanca</h3>
                 <p className="text-sm text-white/80">Nature Parks & Pools</p>
               </div>
             </div>
             <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-primary text-white p-8 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-bold mb-4">Looking for something else?</h3>
                <p className="text-primary-foreground/80 mb-6">Browse all 50+ experiences</p>
                <Button variant="secondary" size="lg" className="rounded-full w-full shadow-lg text-primary hover:text-primary">Browse All</Button>
             </div>
           </div>
        </div>
      </section>
    </AppLayout>
  );
}
