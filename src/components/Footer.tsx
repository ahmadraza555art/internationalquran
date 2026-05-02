import { BookOpen } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center"><BookOpen className="text-secondary-foreground" /></div>
        <span className="font-display font-bold text-xl">International Learn Quran Academy</span>
      </div>
      <p className="text-primary-foreground/70 max-w-xl mx-auto mb-4">Spreading the light of the Holy Quran with authentic, accessible online learning for students worldwide.</p>
      <div className="font-arabic text-2xl text-secondary mb-4">بَارَكَ اللَّهُ فِيكُمْ</div>
      <div className="text-primary-foreground/60 text-sm border-t border-primary-foreground/20 pt-6">© {new Date().getFullYear()} International Learn Quran Academy. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
