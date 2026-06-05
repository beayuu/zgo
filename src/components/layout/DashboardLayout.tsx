import { AppLayout } from "@/components/layout/AppLayout";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Ticket, Heart, Star, UserCircle, LogOut } from "lucide-react";
import { ReactNode } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", path: "/dashboard/bookings", icon: Ticket },
    { name: "Favorites", path: "/dashboard/favorites", icon: Heart },
    { name: "Reviews", path: "/dashboard/reviews", icon: Star },
    { name: "Profile", path: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <AppLayout>
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    JD
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">John Doe</h3>
                    <p className="text-sm text-slate-500">john@example.com</p>
                  </div>
                </div>
                <nav className="p-4 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.path;
                    return (
                      <Link key={item.path} href={item.path}>
                        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </div>
                      </Link>
                    );
                  })}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Link href="/">
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Log Out
                      </div>
                    </Link>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
