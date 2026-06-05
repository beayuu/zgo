import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckCircle2, Download, Printer, ChevronRight } from "lucide-react";

export default function BookingConfirmation() {
  const searchParams = new URLSearchParams(window.location.search);
  const bookingId = searchParams.get('id') || "ZGO-12345678";

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-2xl w-full text-center mb-8">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-slate-600">
            Thank you for booking with ZamGo. Your adventure is set! A confirmation email has been sent to your address.
          </p>
        </div>

        <Card className="w-full max-w-2xl overflow-hidden border-t-8 border-t-primary shadow-xl">
          <CardContent className="p-0">
            <div className="p-6 md:p-8 bg-white border-b border-dashed">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Booking Reference</div>
                  <div className="text-2xl font-mono font-bold text-slate-900 tracking-wider">{bookingId}</div>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <div className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                    PAID
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-center">
                <img src="/santa-cruz.png" alt="Santa Cruz Island" className="w-24 h-24 rounded-lg object-cover" />
                <div>
                  <h3 className="font-bold text-xl mb-1">Santa Cruz Island Tour</h3>
                  <div className="text-slate-600 text-sm space-y-1">
                    <p>Date: Tomorrow, 10:00 AM</p>
                    <p>Guests: 2 Adults</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-slate-50 flex flex-col md:flex-row items-center gap-8 justify-between">
              {/* Fake QR Code */}
              <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-sm border border-slate-200 shrink-0">
                <div className="w-full h-full border-4 border-slate-900 grid grid-cols-5 grid-rows-5 gap-1 p-1">
                  {Array(25).fill(0).map((_, i) => (
                    <div key={i} className={`bg-slate-900 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}></div>
                  ))}
                  <div className="absolute top-4 left-4 w-6 h-6 bg-white border-4 border-slate-900"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 bg-white border-4 border-slate-900"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 bg-white border-4 border-slate-900"></div>
                </div>
              </div>

              <div className="flex-1 w-full space-y-3">
                <Button className="w-full h-12" variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download Ticket
                </Button>
                <Button className="w-full h-12" variant="outline">
                  <Printer className="mr-2 h-4 w-4" /> Print Ticket
                </Button>
                <Link href="/dashboard/bookings">
                  <Button className="w-full h-12 mt-2">
                    Go to My Bookings <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
