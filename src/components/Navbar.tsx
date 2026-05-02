import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Packages", href: "#packages" },
  { label: "Registration", href: "#register" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center shadow-elegant">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-primary hidden sm:block">
            International Learn Quran Academy
          </span>
          <span className="font-display font-bold text-base text-primary sm:hidden">ILQA</span>
        </a>
        <ul className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-foreground hover:text-primary font-medium transition-smooth">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#register" className="hidden lg:block">
          <Button variant="hero">Get Started</Button>
        </a>
        <button className="lg:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <ul className="container mx-auto py-4 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground hover:text-primary font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <a href="#register" onClick={() => setOpen(false)}>
              <Button variant="hero" className="w-full">Get Started</Button>
            </a>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
