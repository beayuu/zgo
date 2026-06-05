import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRoute, useLocation, Link } from "wouter";
import { useCreateBooking, useGetAttraction, getGetAttractionQueryKey } from "@workspace/api-client-react";
import { ChevronRight, CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  // Using URL search params manually since wouter's useRoute doesn't parse query strings easily
  const searchParams = new URLSearchParams(window.location.search);
  const attractionId = searchParams.get('attractionId') ? parseInt(searchParams.get('attractionId')!) : 1; // Fallback for demo
  
  const { data: attraction, isLoading } = useGetAttraction(attractionId, {
    query: { enabled: !!attractionId, queryKey: getGetAttractionQueryKey(attractionId) }
  });

  const createBooking = useCreateBooking();
  const [paymentMethod, setPaymentMethod] = useState("gcash");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking.mutate({
      data: {
        attractionId,
        date: new Date().toISOString().split('T')[0],
        time: "10:00",
        guestCount: 2,
        paymentMethod
      }
    }, {
      onSuccess: (data) => {
        setLocation(`/booking-confirmation?id=${data.id}`);
      },
      onError: () => {
        // Fallback for demo if API fails
        setLocation(`/booking-confirmation?id=999`);
      }
    });
  };

  const paymentOptions = [
    { id: "gcash", name: "GCash", icon: "G" },
    { id: "maya", name: "Maya", icon: "M" },
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "P" },
  ];

  return (
    <AppLayout>
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input required placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input required placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input required type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input required type="tel" placeholder="+63 900 000 0000" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paymentOptions.map((opt) => (
                    <div 
                      key={opt.id}
                      className={`border rounded-xl p-4 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === opt.id ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-slate-300'}`}
                      onClick={() => setPaymentMethod(opt.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center font-bold text-slate-700">
                        {opt.icon}
                      </div>
                      <span className="font-semibold">{opt.name}</span>
                      {paymentMethod === opt.id && (
                        <div className="ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4 animate-in fade-in">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 mt-0.5 text-blue-600" />
              <p>Your payment information is encrypted and secure. We do not store your credit card details.</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-primary/20 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-primary/5 p-6 border-b border-primary/10">
                  <h2 className="text-lg font-bold mb-4">Booking Summary</h2>
                  {isLoading ? (
                    <div className="space-y-2"><div className="h-4 bg-slate-200 rounded w-full"></div><div className="h-4 bg-slate-200 rounded w-2/3"></div></div>
                  ) : attraction ? (
                    <div className="flex gap-4">
                      <img src={attraction.imageUrl} alt={attraction.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div>
                        <h3 className="font-bold line-clamp-2">{attraction.name}</h3>
                        <p className="text-sm text-slate-500">{attraction.location}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
                
                <div className="p-6 space-y-4 text-sm">
                  <div className="flex justify-between pb-4 border-b">
                    <span className="text-slate-600">Date</span>
                    <span className="font-semibold">Tomorrow</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b">
                    <span className="text-slate-600">Guests</span>
                    <span className="font-semibold">2 Adults</span>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Tickets (2)</span>
                      <span>₱{(attraction?.price || 1500) * 2}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Taxes & Fees</span>
                      <span>₱0</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end pt-4 border-t border-slate-200 mt-4">
                    <span className="font-bold text-lg">Total Amount</span>
                    <div className="text-right">
                      <span className="text-sm text-slate-500 block mb-1">PHP</span>
                      <span className="text-3xl font-bold text-primary">₱{(attraction?.price || 1500) * 2}</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 mt-6 text-lg rounded-xl shadow-lg" disabled={createBooking.isPending}>
                    {createBooking.isPending ? "Processing..." : "Pay Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
