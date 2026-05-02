import { Button } from "@/components/ui/button";
import { BookOpen, BookMarked, Sparkles, BookText, Brain, Languages, ScrollText, Video, Star } from "lucide-react";

const courses = [
  { icon: BookOpen, title: "Norani Qaida", desc: "Foundation course for beginners to learn Arabic alphabet, pronunciation, and basic reading skills. Perfect starting point for Quran learning.", points: ["Arabic alphabet","Pronunciation basics","Reading practice","Interactive lessons"] },
  { icon: BookMarked, title: "Madni Qaida", desc: "Advanced foundational course focusing on Tajweed rules and proper recitation techniques with step-by-step guidance.", points: ["Tajweed basics","Proper pronunciation","Rule application","Practical exercises"] },
  { icon: Sparkles, title: "Tajweed Course", desc: "Master the art of proper Quran recitation with detailed Tajweed rules. Learn Makharij, Sifaat, and proper pronunciation from certified teachers.", points: ["Complete Tajweed rules","Makharij al-Huroof","Advanced techniques","Certification"] },
  { icon: BookText, title: "Nazrah Quran With Tajweed", desc: "Learn to read the Holy Quran with correct pronunciation and Tajweed rules. Develop fluency in Quranic recitation.", points: ["Fluent Quran reading","Tajweed application","Pronunciation perfection","Regular practice"] },
  { icon: Brain, title: "Hifzul Quran", desc: "Structured memorization program to help you memorize the Holy Quran with proper revision techniques and personalized pace.", points: ["Step-by-step memorization","Revision strategies","Progress tracking","Flexible duration"] },
  { icon: Languages, title: "Translation of Quran (Urdu, English)", desc: "Understand the meanings of the Holy Quran in Urdu and English. Learn the context and wisdom behind each verse.", points: ["Urdu translation","English translation","Word-by-word meaning","Contextual understanding"] },
  { icon: ScrollText, title: "Tafseer ul Quran", desc: "Deep understanding of Quranic meanings, context, and Islamic teachings. Learn the wisdom behind the verses with scholarly explanations.", points: ["Verse-by-verse Tafseer","Historical context","Islamic principles","Scholar guidance"] },
  { icon: Video, title: "Online Classes", desc: "Interactive one-on-one or group classes via video conferencing. Learn from anywhere with flexible scheduling options.", points: ["Live interactive sessions","Recording available","Flexible timings","Personal attention"] },
  { icon: Star, title: "Comprehensive Islamic Learning", desc: "All-in-one course covering authentic Islamic teachings with clarity and care. From daily prayers to Quranic stories, strengthen your faith and understanding.", points: ["Namaz (Prayer): Step-by-step guidance","Kalimas with Translation","Daily Duas with Meanings","Tarbiyyat & Adab: Good manners","Quranic Stories with Lessons","Basic Islamic Knowledge"] },
];

const Courses = () => (
  <section id="courses" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Courses</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Our Courses & Services</h2>
        <p className="text-muted-foreground text-lg">Comprehensive Quranic education tailored to your needs and learning pace</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(({ icon: Icon, title, desc, points }) => (
          <div key={title} className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elegant border border-border hover:border-secondary transition-smooth flex flex-col">
            <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-smooth">
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">{desc}</p>
            <ul className="space-y-2 mb-6">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <span className="text-secondary mt-1">●</span>
                  <span className="text-foreground">{p}</span>
                </li>
              ))}
            </ul>
            <a href="#register"><Button variant="hero" className="w-full">Enroll Now</Button></a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Courses;
