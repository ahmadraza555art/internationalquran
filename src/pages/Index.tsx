import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Packages from "@/components/Packages";
import Registration from "@/components/Registration";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <Hero />
      <About />
      <Courses />
      <Packages />
      <Registration />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
