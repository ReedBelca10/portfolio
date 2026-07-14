import { Navbar, SidebarNav, Footer } from '@/components';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import Blogs from '@/components/Blogs';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  

  return (
    <>
      <Navbar />
      <SidebarNav />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Works Section */}
        <Works />

        {/* Blog Section */}
        <Blogs />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}

