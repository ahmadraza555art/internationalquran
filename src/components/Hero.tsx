import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import adVideo from "@/assets/ad-video.mp4";
import { useLang } from "@/lib/lang";

const Hero = () => {
  const { t } = useLang();
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_hsl(45_85%_60%/0.4),_transparent_60%)]" />
      <div className="absolute top-10 right-10 text-secondary/20 font-arabic text-[8rem] leading-none select-none pointer-events-none">﷽</div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 py-16">
        <div className="text-primary-foreground space-y-8 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium backdrop-blur">
            🌙 {t("Welcome to Authentic Quranic Learning", "حقیقی قرآنی تعلیم میں خوش آمدید")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t("Welcome to the Leading ", "")}
            <span className="text-secondary">{t("Online Quran Academy", "آن لائن قرآن اکیڈمی")}</span>
            {t(" for Kids & Adults", " بچوں اور بڑوں کے لیے")}
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
            {t("Welcome to our International Online Quran Academy, a trusted global platform dedicated to helping you and your family learn Quran online from the comfort of your home. With expert male and female tutors, we offer customized Quran classes for kids and adults designed to perfect your Tajweed and recitation.",
               "ہماری انٹرنیشنل آن لائن قرآن اکیڈمی میں خوش آمدید — ایک قابلِ اعتماد عالمی پلیٹ فارم جو آپ اور آپ کے خاندان کو گھر بیٹھے آن لائن قرآن سیکھنے میں مدد دیتا ہے۔ مستند مرد و خواتین اساتذہ کے ساتھ بچوں اور بڑوں کے لیے تجوید و تلاوت کی خصوصی کلاسز۔")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#register"><Button variant="gold" size="lg"><BookOpen /> {t("Start Learning", "ابھی شروع کریں")}</Button></a>
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
