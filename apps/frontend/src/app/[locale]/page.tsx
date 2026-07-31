import { Navbar, SidebarNav, Footer } from '@/components';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import Blogs from '@/components/Blogs';
import ContactSection from '@/components/ContactSection';

import { fetchCV } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cvUrl = await fetchCV(locale);

  return (
    <>
      <Navbar />
      <SidebarNav />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero cvUrl={cvUrl} />

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

