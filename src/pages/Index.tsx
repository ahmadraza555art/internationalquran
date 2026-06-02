import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Packages from "@/components/Packages";
import Registration from "@/components/Registration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import Seo from "@/components/Seo";
import { LangProvider } from "@/lib/lang";

const Index = () => (
  <LangProvider>
    <Seo
      title="International Online Quran Academy - Learn Quran Online"
      description="Learn Quran online with qualified tutors. Interactive Quran classes with Tajweed for kids and adults. Book your free trial today!"
      path="/"
    />
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <Packages />
        <GallerySection />
        <Testimonials />
        <Registration />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  </LangProvider>
);

export default Index;
