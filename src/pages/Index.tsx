import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Packages from "@/components/Packages";
import Registration from "@/components/Registration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import { LangProvider } from "@/lib/lang";

const Index = () => (
  <LangProvider>
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <Packages />
        <GallerySection />
        <Registration />
        <Contact />
      </main>
      <Footer />
    </div>
  </LangProvider>
);

export default Index;
