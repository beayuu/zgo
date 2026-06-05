import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useListBookings } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { Link } from "wouter";

export default function DashboardBookings() {
  const { data: bookings, isLoading } = useListBookings();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {isLoading ? (
           <div className="p-8 text-center text-slate-500">Loading bookings...</div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.length ? bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-sm font-medium">{booking.bookingReference}</TableCell>
                  <TableCell className="font-bold">{booking.attractionName}</TableCell>
                  <TableCell>
                    <div className="text-sm">{booking.date}</div>
                    <div className="text-xs text-slate-500">{booking.time}</div>
                  </TableCell>
                  <TableCell className="font-medium">₱{booking.totalAmount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/booking-confirmation?id=${booking.bookingReference}`}>
                        <Button variant="ghost" size="icon" title="View"><Eye className="h-4 w-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" title="Download Ticket"><Download className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    You don't have any bookings yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}
