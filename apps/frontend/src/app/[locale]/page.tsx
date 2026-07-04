import { useTranslations } from 'next-intl';
import { Navbar, SidebarNav, ModuleTitle, Button, Container } from '@/components';
import Hero from '@/components/Hero';
import About from '@/components/About';export default function HomePage() {
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

        {/* Projects Section */}
        <section id="projects" className="relative min-h-screen bg-bg-secondary py-24">
          <Container>
            <ModuleTitle
              badge="Portfolio"
              title="Recent Works"
              description="A selection of projects I've worked on recently"
              className="mb-16"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="group bg-bg-primary rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                    <span className="text-h3-u font-bold text-brand-primary/50">Project {item}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-h4-u font-semibold text-neutral-white mb-2">
                      {t(`pages.home.projects.item${item}.title`) || `Project ${item}`}
                    </h3>
                    <p className="text-label-u text-neutral-grey mb-4">
                      {t(`pages.home.projects.item${item}.description`) || 'Brief project description goes here'}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      View Project →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Skills Section */}
        <section id="skills" className="relative min-h-screen bg-bg-primary py-24">
          <Container>
            <ModuleTitle
              badge="Expertise"
              title="My Skills"
              description="Technologies and tools I work with"
              className="mb-16"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {['Frontend', 'Backend', 'Design', 'Database', 'Tools', 'DevOps', 'Testing', 'Other'].map((category) => (
                <div key={category} className="bg-bg-secondary rounded-xl p-6">
                  <h3 className="text-h4-u font-semibold text-brand-primary mb-4">{category}</h3>
                  <ul className="space-y-3">
                    <li className="text-label-u text-neutral-white">React</li>
                    <li className="text-label-u text-neutral-white">TypeScript</li>
                    <li className="text-label-u text-neutral-white">Tailwind CSS</li>
                    <li className="text-label-u text-neutral-white">Next.js</li>
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Blog Section */}
        <section id="blog" className="relative min-h-screen bg-bg-secondary py-24">
          <Container>
            <ModuleTitle
              badge="Articles"
              title="Latest Blog Posts"
              description="Thoughts, tutorials, and insights"
              className="mb-16"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <article key={item} className="group bg-bg-primary rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20" />
                  <div className="p-6">
                    <time className="text-label-u text-brand-primary">
                      {new Date(2024, 0, item).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <h3 className="text-h4-u font-semibold text-neutral-white mt-3 mb-2 group-hover:text-brand-primary transition-colors">
                      {t(`pages.home.blog.item${item}.title`) || `Blog Post ${item}`}
                    </h3>
                    <p className="text-label-u text-neutral-grey mb-4 line-clamp-2">
                      {t(`pages.home.blog.item${item}.excerpt`) || 'Brief article excerpt goes here'}
                    </p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Read More →
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

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
