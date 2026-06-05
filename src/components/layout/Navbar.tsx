import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Globe } from "lucide-react";
import logoPng from "@assets/Zamgo_Logo_1780658594471.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { name: "Attractions", path: "/attractions" },
    { name: "Tours & Packages", path: "/packages" },
    { name: "Transportation", path: "/transportation" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <img src={logoPng} alt="ZamGo Logo" className="h-8 cursor-pointer" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.path ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search destinations, tours..." 
              className="pl-9 pr-4 py-2 bg-muted/50 border border-transparent rounded-full text-sm focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-[250px] focus:w-[300px]"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Globe className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2 border-l pl-4 ml-2">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button className="font-medium rounded-full shadow-sm hover-elevate">Sign Up</Button>
            </Link>
          </div>
        </div>

        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none"
              />
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className="text-base font-medium py-2 px-3 hover:bg-muted rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <hr />
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">Log In</Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-start">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
