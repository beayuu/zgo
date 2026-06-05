import { MerchantLayout } from "@/components/layout/MerchantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMerchantDashboard } from "@workspace/api-client-react";
import { MapPin, TrendingUp, Users, DollarSign, Package } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MerchantDashboard() {
  const { data: dashboard, isLoading } = useGetMerchantDashboard();

  if (isLoading) return <MerchantLayout><div className="animate-pulse space-y-4"><div className="h-32 bg-slate-200 rounded-xl"></div><div className="h-64 bg-slate-200 rounded-xl"></div></div></MerchantLayout>;

  return (
    <MerchantLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Merchant Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's how your attractions are performing.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="text-green-500 text-sm font-bold flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> +12%</span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-900">₱{dashboard?.totalRevenue?.toLocaleString() || "124,500"}</h3>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-green-500 text-sm font-bold flex items-center"><TrendingUp className="h-3 w-3 mr-1"/> +5%</span>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Total Bookings</p>
            <h3 className="text-2xl font-bold text-slate-900">{dashboard?.totalBookings || 45}</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <Package className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Active Attractions</p>
            <h3 className="text-2xl font-bold text-slate-900">{dashboard?.totalAttractions || 8}</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium mb-1">Pending Bookings</p>
            <h3 className="text-2xl font-bold text-slate-900">{dashboard?.pendingBookings || 12}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {dashboard?.monthlyRevenue && dashboard.monthlyRevenue.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboard.monthlyRevenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} tickFormatter={(value) => `₱${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">Not enough data to display chart</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50">
          <CardHeader>
            <CardTitle>Top Attractions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Attraction</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboard?.topAttractions?.length ? dashboard.topAttractions.slice(0,5).map((attr) => (
                  <TableRow key={attr.id} className="border-b-0 hover:bg-slate-50">
                    <TableCell>
                      <div className="font-bold text-sm text-slate-900 truncate max-w-[150px]">{attr.name}</div>
                      <div className="text-xs text-slate-500">{attr.rating.toFixed(1)} ⭐</div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-slate-900">₱{attr.price}</TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-4 text-slate-500">No attractions yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MerchantLayout>
  );
}
