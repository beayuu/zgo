import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function DashboardProfile() {
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
              JD
            </div>
            <div>
              <Button type="button" variant="outline" size="sm" className="mb-2">Change Avatar</Button>
              <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+63 917 123 4567" />
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-bold text-lg mb-4">Password Change</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end">
            <Button type="submit" size="lg">Save Changes</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
