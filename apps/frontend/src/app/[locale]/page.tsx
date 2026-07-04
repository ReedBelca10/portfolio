import { Navbar, SidebarNav, Container, Footer } from '@/components';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Works from '@/components/Works';
import Blogs from '@/components/Blogs';

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

        {/* Contact Section (pixel-accurate) */}
        <section id="contact" className="relative bg-[radial-gradient(circle_at_top_left,_rgba(0,217,255,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_18%),#071216] py-20 overflow-hidden">
          <Container>
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="text-center">
                <h2 style={{ color: '#00D9FF', fontSize: 'clamp(48px, 6.2vw, 72px)', lineHeight: 1 }} className="font-semibold">Contact</h2>
                <div className="mx-auto my-4" style={{ width: 140 }}>
                  <div className="h-0.5 bg-[#00D9FF] mx-auto w-full relative" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="block w-2 h-2 bg-[#00D9FF] rounded-full mx-auto"></span>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-8">I&apos;m currently available for freelance work</p>

                <div className="mx-auto mb-10">
                  <button className="inline-flex items-center justify-center border-2 border-[#00D9FF] text-[#00D9FF] rounded-tr-3xl rounded-bl-3xl px-8 py-4 text-lg font-semibold hover:bg-[#00D9FF]/10 transition-all">
                    Send Me A Message
                  </button>
                </div>
              </div>

              <div className="bg-[#071216]/95 rounded-xl p-8 md:p-12 border border-white/10">
                <form className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#00D9FF] mb-2">Your name *</label>
                      <input type="text" placeholder="Enter your name" className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 focus:outline-none focus:border-[#00D9FF] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#00D9FF] mb-2">Your email *</label>
                      <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 focus:outline-none focus:border-[#00D9FF] transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#00D9FF] mb-2">Your message *</label>
                    <textarea rows={6} placeholder="Enter your needs" className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 focus:outline-none focus:border-[#00D9FF] resize-none transition-colors" />
                  </div>

                  <div className="flex justify-center">
                    <button type="button" className="inline-flex items-center gap-3 bg-[#00D9FF] text-[#071216] px-8 py-3 rounded-full font-semibold shadow-lg hover:-translate-y-1 transition-transform">
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#071216" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-10 h-px bg-white/10" />
            </div>
          </Container>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
