"use client";

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen" style={{ backgroundColor: '#292F36' }}>
      <div className="container-custom mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-[8%] py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left profile card */}
          <aside className="md:col-span-3">
            <div className="relative rounded-[28px] p-6 md:p-8 bg-[#263034] border-l-4 border-cyan-400" style={{ minHeight: 520 }}>
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-cyan-400">
                  <Image src="/profile.jpeg" alt="Caleb" width={112} height={112} className="object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-white font-monospace">Caleb</h3>
                <p className="text-sm text-neutral-grey">Full-Stack Developer</p>

                <div className="mt-4 space-y-2 text-sm text-neutral-grey w-full">
                  <div className="flex items-center gap-2"><span className="text-cyan-400">✉</span><span>calebadjeoda@hotmail.com</span></div>
                  <div className="flex items-center gap-2"><span className="text-cyan-400">📍</span><span>Lomé, Togo</span></div>
                  <div className="flex items-center gap-2"><span className="text-cyan-400">💼</span><span>Full-time / Freelancer</span></div>
                  <div className="flex items-center gap-2"><span className="text-cyan-400">🔗</span><span>www.calebadjeoda.com</span></div>
                </div>

                <div className="mt-6 w-full">
                  <Link href="/CalebCV.pdf" target="_blank" className="inline-flex items-center justify-center w-full bg-white text-slate-900 rounded-full py-3 px-6 font-medium shadow-md">
                    Download CV
                    <svg className="ml-3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Center hero content */}
          <div className="md:col-span-6">
            <div className="max-w-3xl">
              <h1 className="text-white font-monospace font-semibold leading-tight" style={{ fontSize: 'clamp(32px, 4.5vw, 64px)' }}>
                Hey
                <br />
                I&apos;m <span className="text-cyan-400">Caleb</span>,
                <br />
                Full-Stack Developer
              </h1>

              <p className="text-neutral-grey mt-6 text-base md:text-lg leading-relaxed">
                I craft high-performance web and mobile applications, from robust backend architectures to seamless user experiences. If you&apos;re looking for a versatile developer to transform complex ideas into scalable digital products, let&apos;s build together.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <a href="mailto:calebadjeoda@hotmail.com" className="text-cyan-400 font-monospace text-lg inline-flex items-center gap-3">
                  Let&apos;s Talk
                  <span className="inline-block bg-[#2b3238] rounded-full p-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12a2 2 0 0 1-2 2H6l-2 2V4z"/></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right stats pill */}
          <aside className="md:col-span-3 flex justify-end">
            <div className="w-56 rounded-full bg-[#1f2427] py-8 px-6 text-white flex flex-col gap-8 items-start" style={{ minHeight: 420 }}>
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 text-2xl font-monospace">8</span>
                <div>
                  <div className="text-sm">Programming</div>
                  <div className="text-xs text-neutral-grey">Language</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-cyan-400 text-2xl font-monospace">5</span>
                <div>
                  <div className="text-sm">Frameworks</div>
                  <div className="text-xs text-neutral-grey">&amp; Libs</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-cyan-400 text-2xl font-monospace">5</span>
                <div>
                  <div className="text-sm">Databases</div>
                  <div className="text-xs text-neutral-grey">&amp; DevOps</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-cyan-400 text-2xl font-monospace">4</span>
                <div>
                  <div className="text-sm">QA &amp; Design</div>
                  <div className="text-xs text-neutral-grey">Tools</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Hero;
