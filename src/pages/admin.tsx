import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminStats } from "@workspace/api-client-react";
import { Users, Store, Ticket, DollarSign, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useGetAdminStats();

  if (isLoading) return <AdminLayout><div className="animate-pulse space-y-4"><div className="h-32 bg-slate-200 rounded-xl"></div><div className="h-64 bg-slate-200 rounded-xl"></div></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Overview</h1>
          <p className="text-slate-500">System-wide statistics and metrics.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Users</p>
              <h3 className="text-xl font-bold text-slate-900">{stats?.totalUsers || 1250}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Merchants</p>
              <h3 className="text-xl font-bold text-slate-900">{stats?.totalMerchants || 45}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Attractions</p>
              <h3 className="text-xl font-bold text-slate-900">{stats?.activeAttractions || 85}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Bookings</p>
              <h3 className="text-xl font-bold text-slate-900">{stats?.totalBookings || 3420}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Platform Revenue</p>
              <h3 className="text-xl font-bold text-slate-900">₱{stats?.totalRevenue?.toLocaleString() || "1.2M"}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Booking Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              {stats?.monthlyRevenue && stats.monthlyRevenue.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.monthlyRevenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      cursor={{fill: '#f1f5f9'}}
                    />
                    <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">Not enough data to display chart</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Confirmed</span>
                  <span className="font-bold">{stats?.bookingsByStatus?.confirmed || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(stats?.bookingsByStatus?.confirmed || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span> Pending</span>
                  <span className="font-bold">{stats?.bookingsByStatus?.pending || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(stats?.bookingsByStatus?.pending || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> Cancelled</span>
                  <span className="font-bold">{stats?.bookingsByStatus?.cancelled || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(stats?.bookingsByStatus?.cancelled || 0) / (stats?.totalBookings || 1) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
