import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";

const rates: Record<string, { code: string; rate: number }> = {
  PKR: { code: "PKR", rate: 1 },
  USD: { code: "USD", rate: 0.0036 },
  EUR: { code: "EUR", rate: 0.0033 },
  GBP: { code: "GBP", rate: 0.0028 },
  AED: { code: "AED", rate: 0.013 },
  SAR: { code: "SAR", rate: 0.0135 },
  CAD: { code: "CAD", rate: 0.0049 },
  AUD: { code: "AUD", rate: 0.0054 },
  INR: { code: "INR", rate: 0.30 },
};

const Packages = () => {
  const [currency, setCurrency] = useState("GBP");
  const converted = (56 * rates[currency].rate / rates["GBP"].rate).toFixed(2);

  return (
    <section id="packages" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Pricing</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Our Packages</h2>
          <p className="text-muted-foreground text-lg">Choose the perfect package for your Quranic learning journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <h3 className="font-display text-2xl font-bold text-primary mb-2">Free Trial</h3>
            <div className="my-6">
              <div className="font-display text-5xl font-bold text-primary">FREE</div>
              <div className="text-muted-foreground mt-1">3 Days</div>
            </div>
            <ul className="space-y-3 mb-8">
              {["3 days free trial","30-minute sessions","One-on-one teaching","Experience our teaching method","No credit card required"].map((f) => (
                <li key={f} className="flex items-start gap-2"><Check className="text-secondary w-5 h-5 mt-0.5 shrink-0" /><span>{f}</span></li>
              ))}
            </ul>
            <a href="#register"><Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">Enroll Now</Button></a>
          </div>

          <div className="relative bg-gradient-hero text-primary-foreground rounded-2xl p-8 shadow-elegant scale-105 border-2 border-secondary">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-gold text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-gold">
              <Crown className="w-4 h-4" /> Most Popular
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">Standard Package</h3>
            <div className="my-6">
              <div className="font-display text-5xl font-bold text-secondary">20,000 PKR</div>
              <div className="text-primary-foreground/80 mt-1">Per Month</div>
            </div>
            <ul className="space-y-3 mb-8">
              {["5 Classes per week","30-minute sessions","One-on-one teaching","Detailed progress reports","Priority WhatsApp support","Free study materials","Flexible rescheduling"].map((f) => (
                <li key={f} className="flex items-start gap-2"><Check className="text-secondary w-5 h-5 mt-0.5 shrink-0" /><span>{f}</span></li>
              ))}
            </ul>
            <a href="#register"><Button variant="gold" className="w-full">Enroll Now</Button></a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border">
          <h3 className="font-display text-2xl font-bold text-primary mb-2">Standard Package Currency Converter</h3>
          <p className="text-muted-foreground mb-6 text-sm">Convert the Standard Package price (56 GBP) to your preferred currency</p>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="text-sm font-medium text-foreground mb-2 block">Select Currency</label>
              <select value={currency} onChange={(e)=>setCurrency(e.target.value)} className="w-full h-11 rounded-lg border border-input bg-background px-3">
                {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full bg-gradient-soft border-2 border-secondary/40 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">Converted Price</div>
              <div className="font-display text-2xl font-bold text-primary">{converted} {currency}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
