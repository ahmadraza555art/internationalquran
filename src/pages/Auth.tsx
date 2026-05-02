import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/chat");
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/chat`,
          data: { display_name: form.name },
        },
      });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Account created! You're now logged in. 🌙");
      navigate("/chat");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Welcome back!");
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-elegant border border-border p-8">
        <Link to="/" className="flex flex-col items-center gap-2 mb-6">
          <img src={logo} alt="ILQA" className="w-20 h-20 object-contain" />
          <h1 className="font-display text-2xl font-bold text-primary text-center">International Learn Quran Academy</h1>
        </Link>
        <h2 className="font-display text-xl font-bold text-center mb-1">{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">{mode === "login" ? "Login to chat with the academy" : "Sign up to start chatting"}</p>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label>Full Name</Label>
              <Input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
            </div>
          )}
          <div>
            <Label>Email</Label>
            <Input required type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <Label>Password</Label>
            <Input required type="password" minLength={6} value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="block mx-auto mt-4 text-sm text-primary hover:underline">
          {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
        <Link to="/" className="block text-center mt-4 text-xs text-muted-foreground hover:text-primary">← Back to website</Link>
      </div>
    </div>
  );
};

export default Auth;
