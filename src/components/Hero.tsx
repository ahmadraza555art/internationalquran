import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-quran.jpg";

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-20">
    {/* Decorative rays */}
    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_hsl(45_85%_60%/0.4),_transparent_60%)]" />
    <div className="absolute top-10 right-10 text-secondary/20 font-arabic text-[8rem] leading-none select-none pointer-events-none">﷽</div>

    <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 py-16">
      <div className="text-primary-foreground space-y-8 animate-fade-in">
        <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium backdrop-blur">
          🌙 Welcome to Authentic Quranic Learning
        </span>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          International Learn <span className="text-secondary">Quran Academy</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
          Master the Holy Quran with certified teachers. Learn Tajweed, Memorization, and Islamic Studies from the comfort of your home.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#register"><Button variant="gold" size="lg"><BookOpen /> Get Started</Button></a>
          <a href="#courses"><Button variant="outlineHero" size="lg">Explore Courses <ArrowRight /></Button></a>
        </div>
        <div className="flex gap-8 pt-4">
          {[["500+","Students"],["15+","Courses"],["10+","Teachers"]].map(([n,l])=>(
            <div key={l}>
              <div className="font-display text-3xl font-bold text-secondary">{n}</div>
              <div className="text-sm text-primary-foreground/80">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-gold rounded-3xl blur-2xl opacity-30" />
        <div className="relative rounded-3xl overflow-hidden border-2 border-secondary/40 shadow-elegant">
          <img src={heroImg} alt="Holy Quran with golden light" width={1536} height={1024} className="w-full h-auto" />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground px-6 py-4 rounded-2xl shadow-card hidden md:block">
          <div className="font-arabic text-2xl text-primary">بِسْمِ اللَّهِ</div>
          <div className="text-xs text-muted-foreground">In the name of Allah</div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
