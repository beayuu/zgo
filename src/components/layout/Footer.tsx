import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logoPng from "@assets/Zamgo_Logo_1780658594471.png";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          <div className="lg:col-span-2">
            <Link href="/">
              <img src={logoPng} alt="ZamGo Logo" className="h-10 mb-6 brightness-0 invert" />
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
              Your ultimate digital gateway for discovering and booking Zamboanga City's most vibrant experiences. Sun-soaked adventures await.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Discover</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/attractions" className="hover:text-primary transition-colors">Attractions</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Tour Packages</Link></li>
              <li><Link href="/transportation" className="hover:text-primary transition-colors">Transportation</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Travel Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Special Offers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Pasonanca, Zamboanga City, Philippines 7000</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+63 917 123 4567</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hello@zamgo.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ZamGo Travel & Tours. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Globe className="h-4 w-4" /> English (US)</span>
            <span>PHP (₱)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}
