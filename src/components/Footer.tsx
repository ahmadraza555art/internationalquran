import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img src={logo} alt="International Online Quran Academy logo" className="w-14 h-14 object-contain bg-white/10 rounded-full p-1" />
        <span className="font-display font-bold text-xl">International Learn Quran Academy</span>
      </div>
      <p className="text-primary-foreground/70 max-w-xl mx-auto mb-4">Spreading the light of the Holy Quran with authentic, accessible online learning for students worldwide.</p>
      <div className="font-arabic text-2xl text-secondary mb-4">بَارَكَ اللَّهُ فِيكُمْ</div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <a
          href="https://www.youtube.com/channel/UCpSVeH9Xc0gyBIUV0EX0TFw/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch our Quran classes on YouTube"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-smooth rounded-full px-5 py-2 text-sm font-medium"
        >
          <Youtube className="w-5 h-5 text-red-500" /> YouTube Channel
        </a>
      </div>
      <div className="text-sm text-primary-foreground/80 mb-4">📞 +92 307 8524124 &nbsp;|&nbsp; ✉️ ar3801420@gmail.com</div>
      <div className="text-primary-foreground/60 text-sm border-t border-primary-foreground/20 pt-6">© {new Date().getFullYear()} International Learn Quran Academy. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
