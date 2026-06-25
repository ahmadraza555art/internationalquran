import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import adVideo from "@/assets/ad-video.mp4";
import mosqueBg from "@/assets/hero-mosque-grand.jpg";
import { useLang } from "@/lib/lang";

const Hero = () => {
  const { t } = useLang();
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero animate-gradient overflow-hidden pt-20">
      <img
        src={mosqueBg}
        alt="Grand mosque at golden sunset — Online Quran Academy"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover animate-slow-zoom pointer-events-none"
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(150_60%_12%/0.92),hsl(150_55%_22%/0.7)_45%,hsl(150_50%_18%/0.45))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,_hsl(45_85%_60%/0.25),_transparent_55%)]" />

      {/* Animated glowing orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-primary-glow/30 blur-3xl animate-blob pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Twinkling stars */}
      {[
        { top: "15%", left: "20%", d: "0s" },
        { top: "30%", left: "70%", d: "0.6s" },
        { top: "60%", left: "12%", d: "1.2s" },
        { top: "75%", left: "55%", d: "1.8s" },
        { top: "22%", left: "45%", d: "2.4s" },
        { top: "50%", left: "85%", d: "1s" },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-secondary animate-twinkle pointer-events-none"
          style={{ top: s.top, left: s.left, animationDelay: s.d }}
        />
      ))}

      <div className="absolute top-10 right-10 text-secondary/20 font-arabic text-[8rem] leading-none select-none pointer-events-none animate-float">﷽</div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full border border-secondary/10 animate-spin-slow pointer-events-none" />



      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 py-16">
        <div className="text-primary-foreground space-y-8 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium backdrop-blur">
            🌙 {t("Welcome to Authentic Quranic Learning", "حقیقی قرآنی تعلیم میں خوش آمدید")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t("Welcome to the Leading ", "")}
            <span className="text-shimmer">{t("Online Quran Academy", "آن لائن قرآن اکیڈمی")}</span>
            {t(" for Kids & Adults", " بچوں اور بڑوں کے لیے")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
            {t("Welcome to our International Online Quran Academy, a trusted global platform dedicated to helping you and your family learn Quran online from the comfort of your home. With expert male and female tutors, we offer customized Quran classes for kids and adults designed to perfect your Tajweed and recitation.",
               "ہماری انٹرنیشنل آن لائن قرآن اکیڈمی میں خوش آمدید — ایک قابلِ اعتماد عالمی پلیٹ فارم جو آپ اور آپ کے خاندان کو گھر بیٹھے آن لائن قرآن سیکھنے میں مدد دیتا ہے۔ مستند مرد و خواتین اساتذہ کے ساتھ بچوں اور بڑوں کے لیے تجوید و تلاوت کی خصوصی کلاسز۔")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#register"><Button variant="gold" size="lg" className="animate-glow-pulse hover-scale"><BookOpen /> {t("Start Learning", "ابھی شروع کریں")}</Button></a>
            <a href="#courses"><Button variant="outlineHero" size="lg">{t("Join Now", "ابھی شامل ہوں")} <ArrowRight /></Button></a>
          </div>
          <div className="flex gap-8 pt-4">
            <div>
              <div className="font-display text-3xl font-bold text-secondary">15+</div>
              <div className="text-sm text-primary-foreground/80">{t("Courses", "کورسز")}</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-gold rounded-3xl blur-2xl opacity-30" />
          <div className="relative rounded-3xl overflow-hidden border-2 border-secondary/40 shadow-elegant bg-black">
            <video src={adVideo} autoPlay loop muted playsInline controls className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground px-6 py-4 rounded-2xl shadow-card hidden md:block">
            <div className="font-arabic text-2xl text-primary">بِسْمِ اللَّهِ</div>
            <div className="text-xs text-muted-foreground">{t("In the name of Allah", "اللہ کے نام سے")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
