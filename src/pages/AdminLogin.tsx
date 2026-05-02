import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/lib/auth";
import { toast } from "sonner";
import { Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session && (await isAdmin(data.session.user.id))) navigate("/AHMADISNOT1122/dashboard");
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    if (error) { setLoading(false); toast.error(error.message); return; }
    const admin = await isAdmin(data.user?.id);
    setLoading(false);
    if (!admin) { await supabase.auth.signOut(); toast.error("Access denied. Not an admin."); return; }
    toast.success("Welcome, Admin!");
    navigate("/AHMADISNOT1122/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-elegant border border-border p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="ILQA" className="w-16 h-16 object-contain mb-2" />
          <div className="flex items-center gap-2 text-secondary font-semibold uppercase tracking-wider text-xs"><Shield className="w-4 h-4" /> Admin Area</div>
          <h1 className="font-display text-2xl font-bold text-primary mt-2">Admin Login</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Email</Label><Input required type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} /></div>
          <div><Label>Password</Label><Input required type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} /></div>
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Login as Admin"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-4">
          First time? Create an account at <a href="/auth" className="text-primary hover:underline">/auth</a>, then ask the system admin to grant your account admin access.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
