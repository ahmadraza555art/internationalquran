import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** translate direction */
  variant?: "up" | "left" | "right" | "scale";
  as?: keyof JSX.IntrinsicElements;
}

const hidden: Record<string, string> = {
  up: "opacity-0 translate-y-10",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  scale: "opacity-0 scale-95",
};

const Reveal = ({ children, className = "", delay = 0, variant = "up", as = "div" }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hidden[variant]
      } ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
