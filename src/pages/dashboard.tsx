import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUserDashboard } from "@workspace/api-client-react";
import { Ticket, Plane, CheckCircle2, Wallet, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetUserDashboard();

  if (isLoading) return <DashboardLayout><div className="animate-pulse space-y-4"><div className="h-32 bg-slate-200 rounded-xl"></div><div className="h-64 bg-slate-200 rounded-xl"></div></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Welcome back, John!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Bookings</p>
              <h3 className="text-2xl font-bold">{dashboard?.totalBookings || 12}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Plane className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Upcoming Trips</p>
              <h3 className="text-2xl font-bold">{dashboard?.upcomingTrips || 2}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Completed</p>
              <h3 className="text-2xl font-bold">{dashboard?.completedTrips || 10}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Spent</p>
              <h3 className="text-2xl font-bold">₱{dashboard?.totalSpent?.toLocaleString() || "15,400"}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Bookings</h2>
            <Link href="/dashboard/bookings" className="text-primary hover:underline text-sm font-medium flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {dashboard?.upcomingBookings?.length ? (
               dashboard.upcomingBookings.map(b => (
                 <Card key={b.id}>
                    <CardContent className="p-0 flex flex-col sm:flex-row">
                      <img src={b.imageUrl} alt={b.attractionName} className="w-full sm:w-48 h-32 object-cover" />
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{b.attractionName}</h3>
                            <p className="text-sm text-slate-500">{b.date} • {b.time}</p>
                          </div>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase">{b.status}</span>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <span className="text-sm font-medium">{b.guestCount} Guests</span>
                          <Link href={`/booking-confirmation?id=${b.bookingReference}`}><Button size="sm" variant="outline">View Ticket</Button></Link>
                        </div>
                      </div>
                    </CardContent>
                 </Card>
               ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-slate-500">
                  <p className="mb-4">You have no upcoming trips.</p>
                  <Link href="/attractions"><Button>Explore Attractions</Button></Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-2xl text-white shadow-lg">
            <h2 className="text-xl font-bold mb-2">ZamGo Rewards</h2>
            <p className="mb-6 opacity-90 text-sm">Earn points on every booking and unlock exclusive discounts.</p>
            <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm mb-4">
              <div className="text-sm uppercase tracking-wider font-bold mb-1 opacity-80">Current Points</div>
              <div className="text-3xl font-black">1,250</div>
            </div>
            <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">Redeem Points</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
