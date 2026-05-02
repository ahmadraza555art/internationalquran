import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert([form]);
    setLoading(false);
    if (error) { toast.error("Failed to send. Please try again."); return; }
    toast.success("Message sent! We'll respond soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Contact Us</h2>
          <p className="text-muted-foreground text-lg">Get in touch with us to start your Quranic learning journey</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-3">Get In Touch</h3>
            <p className="text-muted-foreground mb-8">We're here to answer your questions and help you begin your journey of learning the Holy Quran. Feel free to reach out through any of the following channels.</p>
            <div className="space-y-5">
              {[
                { icon: Mail, label: "Email", value: "ar3801420@gmail.com", href: "mailto:ar3801420@gmail.com" },
                { icon: Phone, label: "WhatsApp / Phone", value: "+92 307 8524124", href: "https://wa.me/923078524124" },
                { icon: MapPin, label: "Location", value: "Lahore, Pakistan" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 bg-card p-5 rounded-xl shadow-card border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center shrink-0">
                    <Icon className="text-primary-foreground w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-primary">{label}</div>
                    {href ? (
                      <a href={href} className="text-muted-foreground hover:text-primary transition-smooth break-all">{value}</a>
                    ) : <div className="text-muted-foreground">{value}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-4">
            <h3 className="font-display text-2xl font-bold text-primary mb-2">Send Us a Message</h3>
            <div>
              <Label>Your Name *</Label>
              <Input required value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <Label>Your Email *</Label>
              <Input required type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <Label>Your Message *</Label>
              <Textarea required rows={5} value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
