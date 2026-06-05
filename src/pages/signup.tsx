import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import logoPng from "@assets/Zamgo_Logo_1780658594471.png";
import { Facebook } from "lucide-react";

export default function Signup() {
  return (
    <div className="min-h-screen flex w-full">
      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white z-10 shadow-2xl">
        <div className="max-w-md w-full">
          <Link href="/">
            <img src={logoPng} alt="ZamGo Logo" className="h-8 mb-10 cursor-pointer" />
          </Link>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create an account</h1>
          <p className="text-slate-500 mb-8">Join ZamGo to unlock exclusive deals and manage bookings.</p>

          <div className="flex flex-col gap-4 mb-8">
            <Button variant="outline" className="w-full h-12 relative flex items-center justify-center font-medium">
              <svg className="absolute left-4 h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full h-12 relative flex items-center justify-center font-medium bg-[#1877F2] text-white border-none hover:bg-[#1877F2]/90">
              <Facebook className="absolute left-4 h-5 w-5 fill-white text-white border-white" />
              Sign up with Facebook
            </Button>
          </div>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">or sign up with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <Input type="text" placeholder="John Doe" className="h-12 bg-slate-50" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <Input type="email" placeholder="name@example.com" className="h-12 bg-slate-50" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <Input type="tel" placeholder="+63 900 000 0000" className="h-12 bg-slate-50" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Input type="password" placeholder="••••••••" className="h-12 bg-slate-50" required />
            </div>
            
            <div className="text-sm text-slate-500 pt-2">
              By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base shadow-md mt-4">Create Account</Button>
          </form>

          <p className="text-center mt-8 text-slate-600">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

      {/* Left side image */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900">
        <img 
          src="/santa-cruz.png" 
          alt="Santa Cruz Beach" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Discover the hidden gems.</h2>
          <p className="text-lg text-slate-200">Join thousands of travelers exploring Zamboanga's finest.</p>
        </div>
      </div>
    </div>
  );
}
