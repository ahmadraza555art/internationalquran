import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import studentImg from "@/assets/student-learning.jpg";
import { Users } from "lucide-react";

const courses = ["Norani Qaida","Madni Qaida","Tajweed Course","Quran Memorization (Hifz)","Online Quran Classes","Tafseer & Islamic Studies"];
const packages = ["Free Trial","Standard Package"];

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", age: "", course: "", package: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.course || !form.package) { toast.error("Please select course and package"); return; }
    setLoading(true);
    const { error } = await supabase.from("registrations").insert([form]);
    setLoading(false);
    if (error) { toast.error("Failed to register. Please try again."); return; }
    toast.success("Registration successful! We'll contact you soon. 🌙");
    setForm({ full_name: "", email: "", phone: "", age: "", course: "", package: "" });
  };

  return (
    <section id="register" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Join Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Register Now</h2>
          <p className="text-muted-foreground text-lg">Start your Quranic learning journey with us. Choose your package and register today!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-gold rounded-3xl blur-2xl opacity-20" />
            <img src={studentImg} alt="Students learning Quran" loading="lazy" width={1024} height={1024} className="relative w-full rounded-3xl shadow-elegant" />
            <div className="absolute -bottom-6 left-6 right-6 bg-card text-card-foreground rounded-2xl p-5 shadow-elegant border border-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center"><Users className="text-primary-foreground" /></div>
              <div>
                <div className="font-display font-bold text-primary text-lg">Join 500+ Students</div>
                <div className="text-sm text-muted-foreground">Learning Quran with certified teachers</div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-primary mb-1">Registration Form</h3>
              <p className="text-sm text-muted-foreground mb-4">Fill in your details to get started</p>
            </div>
            <div>
              <Label>Full Name *</Label>
              <Input required value={form.full_name} onChange={(e)=>setForm({...form, full_name: e.target.value})} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Email Address *</Label>
                <Input required type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
              </div>
              <div>
                <Label>Phone Number *</Label>
                <Input required value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} />
              </div>
            </div>
            <div>
              <Label>Age *</Label>
              <Input required value={form.age} onChange={(e)=>setForm({...form, age: e.target.value})} />
            </div>
            <div>
              <Label>Select Course *</Label>
              <select required value={form.course} onChange={(e)=>setForm({...form, course: e.target.value})} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Choose a course</option>
                {courses.map((c)=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <Label>Select Package *</Label>
              <select required value={form.package} onChange={(e)=>setForm({...form, package: e.target.value})} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option value="">Choose a package</option>
                {packages.map((c)=><option key={c}>{c}</option>)}
              </select>
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;
