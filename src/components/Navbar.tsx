import { useEffect, useState } from "react";
import { Menu, X, LogIn, LogOut, MessageCircle, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import { useLang } from "@/lib/lang";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { lang, setLang, t } = useLang();

  const links = [
    { label: t("Home", "ہوم"), href: "#home" },
    { label: t("About", "تعارف"), href: "#about" },
    { label: t("Courses", "کورسز"), href: "#courses" },
    { label: t("Packages", "پیکجز"), href: "#packages" },
    { label: t("Gallery", "گیلری"), href: "#gallery" },
    { label: t("Registration", "رجسٹریشن"), href: "#register" },
    { label: t("Contact", "رابطہ"), href: "#contact" },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const logout = async () => { await supabase.auth.signOut(); navigate("/"); };

  const LangSwitcher = () => (
    <div className="flex items-center gap-1 bg-muted/60 rounded-full p-1">
      <Globe className="w-4 h-4 ml-2 text-primary" />
      <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-semibold ${lang==="en" ? "bg-primary text-primary-foreground" : "text-foreground"}`}>EN</button>
      <button onClick={() => setLang("ur")} className={`px-3 py-1 rounded-full text-xs font-semibold ${lang==="ur" ? "bg-primary text-primary-foreground" : "text-foreground"}`}>اردو</button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ILQA Logo" className="w-12 h-12 object-contain" />
          <span className="font-display font-bold text-base text-primary hidden sm:block leading-tight">
            {t("International Learn", "انٹرنیشنل لرن")}<br /><span className="text-secondary">{t("Quran Academy", "قرآن اکیڈمی")}</span>
          </span>
          <span className="font-display font-bold text-base text-primary sm:hidden">ILQA</span>
        </Link>
        <ul className="hidden lg:flex items-center gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-foreground hover:text-primary font-medium text-sm transition-smooth">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-2">
          <LangSwitcher />
          {user ? (
            <>
              <Link to="/chat"><Button variant="ghost" size="sm"><MessageCircle className="w-4 h-4" /> {t("Chat","چیٹ")}</Button></Link>
              <Button variant="outline" size="sm" onClick={logout}><LogOut className="w-4 h-4" /> {t("Logout","لاگ آؤٹ")}</Button>
            </>
          ) : (
            <Link to="/auth"><Button variant="hero" size="sm"><LogIn className="w-4 h-4" /> {t("Login","لاگ ان")}</Button></Link>
          )}
        </div>
        <button className="lg:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="container mx-auto py-4 flex flex-col gap-3 px-4">
            <li><LangSwitcher /></li>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2 text-foreground hover:text-primary font-medium">{l.label}</a>
              </li>
            ))}
            {user ? (
              <>
                <Link to="/chat" onClick={() => setOpen(false)}><Button variant="ghost" className="w-full"><MessageCircle /> {t("Chat","چیٹ")}</Button></Link>
                <Button variant="outline" className="w-full" onClick={() => { setOpen(false); logout(); }}><LogOut /> {t("Logout","لاگ آؤٹ")}</Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)}><Button variant="hero" className="w-full"><LogIn /> {t("Login","لاگ ان")}</Button></Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
