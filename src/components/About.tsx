import { Target, Eye, Users, GraduationCap, CheckCircle2 } from "lucide-react";

const About = () => {
  const cards = [
    { icon: Target, title: "Our Mission", text: "To provide authentic Quranic education to students worldwide, making it accessible, engaging, and transformative through qualified instructors and modern teaching methods." },
    { icon: Eye, title: "Our Vision", text: "To become the world's leading online Quran academy, where students of all ages can connect with the divine message through proper understanding and recitation." },
    { icon: Users, title: "Our Teachers", text: "Certified scholars with Ijazah in Quran recitation and Tajweed, experienced in online teaching, patient, and dedicated to student success." },
  ];

  const quals = ["M.Phil Islamic Studies","M.A Islamic Studies","M.A Arabic","Shahadatul Aalmiyya Course (Eight Years)","Tajweed O Qiraat Course","Hifzul Quran","M.A Education","M.A Urdu","BS English","Computer Course","English language skills"];

  const reasons = ["One-on-One personalized classes","Flexible scheduling to suit your timezone","Qualified teachers with Ijazah certification","Interactive online learning platform","Progress tracking and regular assessments","Affordable pricing with multiple packages","Free trial class for new students","Special courses for children and adults"];

  return (
    <section id="about" className="py-24 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">About Us</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">About Our Academy</h2>
          <p className="text-muted-foreground text-lg">Dedicated to spreading the knowledge of the Holy Quran worldwide with excellence and authenticity</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-card p-8 rounded-2xl shadow-card hover:shadow-elegant transition-smooth border border-border group">
              <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-3">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border mb-16">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="text-secondary w-8 h-8" />
            <h3 className="font-display text-3xl font-bold text-primary">Academy Founder's Qualifications</h3>
          </div>
          <p className="text-muted-foreground mb-8">Led by a highly qualified scholar with extensive Islamic education and diverse academic excellence</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quals.map((q) => (
              <div key={q} className="flex items-center gap-3 bg-muted/50 px-4 py-3 rounded-lg">
                <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                <span className="text-foreground font-medium text-sm">{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-3xl font-bold text-primary text-center mb-8">Why Choose International Learn Quran Academy?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((r) => (
              <div key={r} className="bg-card p-5 rounded-xl border border-border hover:border-secondary transition-smooth flex items-start gap-3">
                <CheckCircle2 className="text-secondary w-5 h-5 shrink-0 mt-0.5" />
                <span className="text-foreground text-sm font-medium">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
