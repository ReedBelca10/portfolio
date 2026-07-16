"use client";

import Image from "next/image";

const CYAN = "#00D9FF";
const BG_CARD = "#2A3137";

export function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col justify-center py-20"
      style={{
        backgroundImage: "url('/AboutMe.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        fontFamily: "IBM Plex Mono, monospace",
      }}
    >
      <style>{`
        /* ── Section Container ── */
        .about-container {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media (min-width: 640px) { .about-container { padding: 0 32px; } }
        @media (min-width: 768px) { .about-container { padding: 0 48px; } }
        @media (min-width: 1024px){ .about-container { padding: 0 80px; } }
        @media (min-width: 1280px){ .about-container { padding: 0 96px; } }
        @media (min-width: 1536px){ .about-container { padding: 0 128px; } }

        /* ── Title Box ── */
        .about-title-wrap {
          position: relative;
          display: inline-block;
          margin-bottom: clamp(30px, 4vw, 50px);
        }
        /* Dual-colored border matching Hero */
        .about-title-border {
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          border-top: 2.5px solid ${CYAN};
          border-left: 2.5px solid ${CYAN};
          border-bottom: 2.5px solid #ffffff;
          border-right: 2.5px solid #ffffff;
          border-radius: clamp(20px, 3vw, 30px) 0 clamp(20px, 3vw, 30px) 0;
          pointer-events: none;
        }
        .about-title {
          position: relative;
          background: rgba(42, 49, 55, 0.4); /* Slight dark tint to stand out */
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 500;
          padding: clamp(10px, 1.5vw, 16px) clamp(24px, 3vw, 42px);
          border-radius: clamp(20px, 3vw, 30px) 0 clamp(20px, 3vw, 30px) 0;
          letter-spacing: 0.02em;
        }

        /* ── Grid Layout ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        @media (min-width: 1280px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            align-items: stretch;
          }
        }
        @media (min-width: 1536px) {
          .about-grid {
            grid-template-columns: 7fr 5fr; /* Text is wider than image on very large screens */
            gap: 120px;
          }
        }

        /* ── Text Card ── */
        .about-card {
          background: ${BG_CARD};
          border-radius: clamp(24px, 3vw, 36px);
          padding: clamp(30px, 4vw, 50px) clamp(24px, 3.5vw, 48px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .about-card p {
          color: rgba(255, 255, 255, 0.85);
          font-size: clamp(13px, 1.1vw, 16px);
          line-height: 1.7;
          margin-bottom: clamp(16px, 1.5vw, 24px);
          font-family: "IBM Plex Mono", monospace;
        }
        .about-card p:last-of-type {
          margin-bottom: 0;
        }
        
        .hl { color: ${CYAN}; } /* Highlight text */

        .about-ctag {
          font-size: clamp(11px, 0.9vw, 14px);
          color: ${CYAN};
          opacity: 0.8;
          line-height: 1;
          margin-bottom: 16px;
        }
        .about-ctag-bottom {
          font-size: clamp(11px, 0.9vw, 14px);
          color: ${CYAN};
          opacity: 0.8;
          line-height: 1;
          margin-top: 24px;
        }

        .about-hello {
          color: ${CYAN};
          font-size: clamp(28px, 2.5vw, 40px);
          font-weight: 600;
          margin-bottom: clamp(20px, 2vw, 28px);
          letter-spacing: 0.02em;
        }

        /* ── Image ── */
        .about-image-wrap {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 1280px) {
          .about-image-wrap {
            height: 100%;
          }
        }
        .about-image-inner {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 4/5;
          border-radius: clamp(24px, 3vw, 36px);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        @media (min-width: 1280px) {
          .about-image-inner {
            max-width: none;
            height: 100%;
            aspect-ratio: auto;
          }
        }
        
        /* ── Alignment Tweaks ── */
        .title-container {
          display: flex;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .title-container {
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="about-container">
        {/* Title */}
        <div className="title-container">
          <div className="about-title-wrap">
            <div className="about-title-border" aria-hidden="true"></div>
            <h2 className="about-title">About Me</h2>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="about-grid">
          {/* Text Card */}
          <div className="about-card">
            <div className="about-ctag">&lt;p&gt;</div>
            <div className="about-hello">Hello!</div>
            
            <p>
              My name is Caleb and I specialize in engineering full-stack web and mobile systems utilizing modern ecosystems like <span className="hl">Next.js</span>, <span className="hl">NestJS</span>, and <span className="hl">Flutter</span>.
            </p>
            
            <p>
              I am a highly motivated professional dedicated to architectural stability, writing clean, robust, and well-tested code that scales. I bridge the gap between technical project design and clean execution to deliver reliable, end-to-end digital solutions.
            </p>
            
            <p>
              When I&apos;m not coding or optimizing database queries, I enjoy <span className="hl">designing modern interfaces in Figma</span>, <span className="hl">analyzing complex system workflows</span>, or diving into technical documentation. I also like to fuel my curiosity by <span className="hl">reading</span>, <span className="hl">exploring philosophical concepts</span>, <span className="hl">creating digital</span> content especially for <span className="hl">YouTube</span>, or unwinding with a good <span className="hl">gaming session</span>.
            </p>
            
            <p>
              I love building impactful platforms that solve real-world problems and continuously pushing the boundaries of my technical capabilities.
            </p>

            <div className="about-ctag-bottom">&lt;/p&gt;</div>
          </div>

          {/* Photo */}
          <div className="about-image-wrap">
            <div className="about-image-inner">
              <Image
                src="/me.png"
                alt="Caleb Adjeoda working on a laptop"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1280px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
