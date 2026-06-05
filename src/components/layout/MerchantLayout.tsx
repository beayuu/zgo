import { Link, useLocation } from "wouter";
import { LayoutDashboard, Package, Ticket, QrCode, BarChart3, LogOut, Store } from "lucide-react";
import { ReactNode } from "react";
import logoPng from "@assets/Zamgo_Logo_1780658594471.png";

export function MerchantLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Overview", path: "/merchant", icon: LayoutDashboard },
    { name: "Attractions", path: "/merchant/attractions", icon: Package },
    { name: "Bookings", path: "/merchant/bookings", icon: Ticket },
    { name: "Validate QR", path: "/merchant/validate", icon: QrCode },
    { name: "Analytics", path: "/merchant/analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 shrink-0 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <Link href="/">
            <img src={logoPng} alt="ZamGo Logo" className="h-8 brightness-0 invert cursor-pointer" />
          </Link>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Store className="h-4 w-4" /> Merchant Portal
          </div>
        </div>
        
        <div className="p-4 flex-1">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path || (item.path !== '/merchant' && location.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path}>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-primary text-white font-medium' : 'hover:bg-slate-800 hover:text-white'}`}>
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link href="/">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <LogOut className="h-5 w-5" />
              Back to Main Site
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden bg-slate-900 p-4 flex items-center justify-between">
          <Link href="/">
            <img src={logoPng} alt="ZamGo Logo" className="h-6 brightness-0 invert cursor-pointer" />
          </Link>
          <div className="text-xs font-bold uppercase tracking-wider text-primary">Merchant</div>
        </header>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
