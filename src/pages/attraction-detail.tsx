import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAttraction, getGetAttractionQueryKey } from "@workspace/api-client-react";
import { useRoute, Link } from "wouter";
import { MapPin, Star, Clock, Calendar as CalendarIcon, Users, ChevronRight, Share2, Heart, CheckCircle2 } from "lucide-react";

export default function AttractionDetail() {
  const [, params] = useRoute("/attractions/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  
  const { data: attraction, isLoading } = useGetAttraction(id, {
    query: {
      enabled: !!id,
      queryKey: getGetAttractionQueryKey(id)
    }
  });

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-1/2 mb-4" />
          <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div><Skeleton className="h-[500px] w-full" /></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!attraction) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Attraction not found</h1>
          <Link href="/attractions"><Button>Back to Attractions</Button></Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/attractions" className="hover:text-primary transition-colors">Attractions</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium truncate">{attraction.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-3">
                {attraction.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{attraction.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center font-bold text-slate-900">
                  <Star className="h-4 w-4 fill-accent text-accent mr-1" /> {attraction.rating.toFixed(1)} 
                  <span className="font-normal text-slate-500 ml-1">({attraction.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {attraction.location}</span>
                <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {attraction.duration}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full shadow-sm bg-white"><Share2 className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full shadow-sm bg-white"><Heart className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] mb-12 rounded-2xl overflow-hidden">
          <div className="md:col-span-2 row-span-2 h-full">
            <img src={attraction.imageUrl} alt={attraction.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          {attraction.images?.slice(0, 4).map((img, idx) => (
            <div key={idx} className="h-full hidden md:block">
              <img src={img} alt={`${attraction.name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
          {(!attraction.images || attraction.images.length === 0) && (
            <>
              <div className="h-full hidden md:block bg-slate-200"></div>
              <div className="h-full hidden md:block bg-slate-200"></div>
              <div className="h-full hidden md:block bg-slate-200"></div>
              <div className="h-full hidden md:block bg-slate-200"></div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Overview</h2>
              <div className="prose prose-slate max-w-none text-slate-700">
                <p>{attraction.description}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">What's Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {attraction.inclusions?.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="text-slate-700">{inc}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">Meeting Point & Schedule</h2>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-4">
                <div className="flex gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm h-min"><MapPin className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Meeting Point</h4>
                    <p className="text-slate-600 mt-1">{attraction.meetingPoint || attraction.location}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <div className="bg-white p-2 rounded-lg shadow-sm h-min"><Clock className="h-5 w-5 text-primary" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Schedule</h4>
                    <p className="text-slate-600 mt-1">{attraction.schedule || "Open daily. Recommended to visit between 8:00 AM - 4:00 PM."}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-slate-200 shadow-xl shadow-slate-200/50">
                <CardContent className="p-6">
                  <div className="flex items-end gap-2 mb-6">
                    {attraction.originalPrice && (
                      <span className="text-lg text-slate-400 line-through mb-1">₱{attraction.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-slate-900">₱{attraction.price}</span>
                    <span className="text-slate-500 mb-1">/ person</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Select Date</label>
                      <Button variant="outline" className="w-full justify-start text-left font-normal border-slate-300">
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Select a date</span>
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Guests</label>
                      <Button variant="outline" className="w-full justify-start text-left font-normal border-slate-300">
                        <Users className="mr-2 h-4 w-4 text-slate-500" />
                        <span>2 Adults</span>
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">₱{attraction.price} x 2 Adults</span>
                      <span className="font-medium">₱{attraction.price * 2}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-slate-100">
                      <span>Total</span>
                      <span className="text-primary">₱{attraction.price * 2}</span>
                    </div>
                  </div>

                  <Link href={`/checkout?attractionId=${attraction.id}`}>
                    <Button size="lg" className="w-full text-lg h-14 shadow-lg rounded-xl">Book Now</Button>
                  </Link>
                  
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" /> Free cancellation up to 24 hours before
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
