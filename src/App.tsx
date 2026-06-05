import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Attractions from "@/pages/attractions";
import AttractionDetail from "@/pages/attraction-detail";
import Packages from "@/pages/packages";
import Transportation from "@/pages/transportation";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Checkout from "@/pages/checkout";
import BookingConfirmation from "@/pages/booking-confirmation";
import Dashboard from "@/pages/dashboard";
import DashboardBookings from "@/pages/dashboard-bookings";
import DashboardFavorites from "@/pages/dashboard-favorites";
import DashboardProfile from "@/pages/dashboard-profile";
import DashboardReviews from "@/pages/dashboard-reviews";
import MerchantDashboard from "@/pages/merchant";
import AdminDashboard from "@/pages/admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/attractions" component={Attractions} />
      <Route path="/attractions/:id" component={AttractionDetail} />
      <Route path="/packages" component={Packages} />
      <Route path="/transportation" component={Transportation} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/booking-confirmation" component={BookingConfirmation} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/bookings" component={DashboardBookings} />
      <Route path="/dashboard/favorites" component={DashboardFavorites} />
      <Route path="/dashboard/profile" component={DashboardProfile} />
      <Route path="/dashboard/reviews" component={DashboardReviews} />
      <Route path="/merchant" component={MerchantDashboard} />
      <Route path="/merchant/:tab" component={MerchantDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/:tab" component={AdminDashboard} />
      
      <Route component={NotFound} /> 
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
