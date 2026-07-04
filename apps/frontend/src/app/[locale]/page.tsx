import { useTranslations } from 'next-intl';
import { Navbar, SidebarNav, ModuleTitle, Button, Container } from '@/components';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import Blogs from '@/components/Blogs';

export default function HomePage() {
  const t = useTranslations();

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
        <section id="contact" className="relative min-h-screen bg-bg-primary py-24">
          <Container>
            <ModuleTitle
              badge="Get in Touch"
              title="Let's Work Together"
              description="Have a project in mind? Let's discuss how we can collaborate"
              className="mb-16"
            />

            <div className="max-w-2xl mx-auto">
              <div className="bg-bg-secondary rounded-xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-h4-u font-semibold text-brand-primary mb-3">Email</h3>
                    <a href="mailto:hello@example.com" className="text-article-u text-neutral-white hover:text-brand-primary transition-colors">
                      hello@example.com
                    </a>
                  </div>
                  <div>
                    <h3 className="text-h4-u font-semibold text-brand-primary mb-3">Location</h3>
                    <p className="text-article-u text-neutral-white">City, Country</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-label-u font-semibold text-neutral-white mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg bg-bg-primary border-2 border-neutral-grey focus:border-brand-primary text-neutral-white placeholder-neutral-grey/60 focus:outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-label-u font-semibold text-neutral-white mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-bg-primary border-2 border-neutral-grey focus:border-brand-primary text-neutral-white placeholder-neutral-grey/60 focus:outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-label-u font-semibold text-neutral-white mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-bg-primary border-2 border-neutral-grey focus:border-brand-primary text-neutral-white placeholder-neutral-grey/60 focus:outline-none transition-all resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <Button variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
