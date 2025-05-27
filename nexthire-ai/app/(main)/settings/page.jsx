"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/Provider";
import { supabase } from "@/services/supabaseClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function Settings() {
  const { user } = useUser();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("Users")
        .select("name, email, picture, notification_preferences")
        .eq("email", user.email)
        .single();

      if (error) {
        toast.error("Failed to load settings");
      } else {
        setName(data.name || "");
        setEmail(data.email || "");
        setPicture(data.picture || "");
        setEmailNotifications(data.notification_preferences?.email_notifications || false);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  // Handle profile update
  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("Users")
      .update({ name })
      .eq("email", user.email);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
    setSaving(false);
  };

  // Handle notification preferences update
  const handleSaveNotifications = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("Users")
      .update({ notification_preferences: { email_notifications: emailNotifications } })
      .eq("email", user.email);

    if (error) {
      toast.error("Failed to update notification preferences");
    } else {
      toast.success("Notification preferences updated successfully");
    }
    setSaving(false);
  };

  // Handle logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      // Delete related data from Interviews and interview-feedback tables
      await supabase.from("Interviews").delete().eq("userEmail", user.email);
      await supabase.from("interview-feedback").delete().eq("userEmail", user.email);

      // Delete user from Users table
      await supabase.from("Users").delete().eq("email", user.email);

      // Sign out and delete the auth user
      await supabase.auth.signOut();
      const { error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) throw error;

      toast.success("Account deleted successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
        <h2 className="font-bold text-2xl mb-5">Settings</h2>
        <div className="space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <h2 className="font-bold text-2xl mb-5">Settings</h2>

      {/* Profile Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            {picture && (
              <Image
                src={picture}
                alt="Profile Picture"
                width={60}
                height={60}
                className="rounded-full"
              />
            )}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              disabled
              className="mt-1 bg-gray-100"
            />
          </div>
          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? <Loader2 className="animate-spin mr-2" /> : null}
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
            <Label htmlFor="email-notifications">Email Notifications</Label>
          </div>
          <p className="text-gray-600 mb-4">
            Receive email notifications for interview updates and candidate feedback.
          </p>
          <Button
            onClick={handleSaveNotifications}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? <Loader2 className="animate-spin mr-2" /> : null}
            Save Preferences
          </Button>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign Out
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <p className="text-gray-600">
                  This action cannot be undone. All your interviews, feedback, and account data will be permanently deleted.
                </p>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDeleting(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                  >
                    {deleting ? <Loader2 className="animate-spin mr-2" /> : null}
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}