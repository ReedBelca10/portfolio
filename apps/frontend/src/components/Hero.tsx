"use client";

import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────
   HERO SECTION
   Breakpoint behaviour (matching mockup exactly):
   ─ default / sm (<768px)  : full-width stack [card → text → stats]
   ─ md (768px–1023px)      : card centred (8/12), text full, stats centred
   ─ lg (1024px–1279px)     : card centred (6/12), text full, stats centred
   ─ xl (1280px–1535px)     : row-1 card centred (6/12), row-2 text(7) + stats(5)
   ─ 2xl (≥1536px)          : single row  profile(3) | text(6) | stats(3)
   ───────────────────────────────────────────────────────────────── */

const CYAN = "#00D9FF";
const BG_HERO = "#292F36";
const BG_CARD = "#2A3137";
const BG_STATS = "#181f26";

const BADGES = ["TS", "PY", "NEST", "FLUTTER", "NEXT.JS"];

const STATS = [
  { n: 8, label: "Programming", sub: "Language" },
  { n: 5, label: "Frameworks", sub: "& Libs" },
  { n: 5, label: "Databases", sub: "& DevOps" },
  { n: 4, label: "QA & Design", sub: "Tools" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col justify-center"
      style={{ backgroundColor: BG_HERO, fontFamily: "IBM Plex Mono" }}
    >
      {/* ── Scoped styles ── */}
      <style>{`
        /* Min-height: viewport minus navbar */
        #home { min-height: calc(100dvh - 60px); }
        @media (min-width: 768px) { #home { min-height: calc(100dvh - 118px); } }

        /* ── Profile card: true larger border box ── */
        .hp-wrap {
          position: relative;
          max-width: 360px;
          margin: 18px auto; /* Margin to accommodate the absolute border */
        }
        @media (min-width: 768px)  { .hp-wrap { max-width: 380px; margin: 20px auto; } }
        @media (min-width: 1536px) { .hp-wrap { max-width: 100%; margin: 24px auto; } }

        /* The continuous border box (cyan top/left, white bottom/right) */
        .hp-border {
          position: absolute;
          top: -14px; left: -14px; right: -14px; bottom: -14px;
          border-top: 2px solid ${CYAN};
          border-left: 2px solid ${CYAN};
          border-bottom: 2px solid #ffffff;
          border-right: 2px solid #ffffff;
          border-radius: clamp(70px, 8vw, 110px) 0 clamp(70px, 8vw, 110px) 0;
          pointer-events: none;
          z-index: 0;
        }
        @media (min-width: 768px) {
          .hp-border { top: -16px; left: -16px; right: -16px; bottom: -16px; border-width: 2.5px; }
        }
        @media (min-width: 1536px) {
          .hp-border { top: -20px; left: -20px; right: -20px; bottom: -20px; }
        }

        /* The dark card */
        .hp-card {
          position: relative;
          z-index: 1;
          background: ${BG_CARD};
          /* Exact same shape as border */
          border-radius: clamp(70px, 8vw, 110px) 0 clamp(70px, 8vw, 110px) 0;
          padding: clamp(24px, 3vw, 38px) clamp(20px, 2.5vw, 32px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(16px, 1.8vw, 24px);
        }

        /* Avatar ring */
        .hp-avatar {
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid ${CYAN};
          width:  clamp(84px, 8.5vw, 120px);
          height: clamp(84px, 8.5vw, 120px);
          flex-shrink: 0;
        }

        /* Info rows */
        .hp-info { width: 100%; display: flex; flex-direction: column; gap: clamp(10px, 1vw, 14px); }
        .hp-row  { display: flex; align-items: flex-start; gap: 10px; }
        .hp-icon {
          color: ${CYAN};
          flex-shrink: 0;
          margin-top: 1px;
          width:  clamp(13px, 1.2vw, 16px);
          height: clamp(13px, 1.2vw, 16px);
          display: flex; align-items: center; justify-content: center;
        }
        .hp-text {
          color: rgba(255,255,255,0.85);
          font-size: clamp(10px, 0.9vw, 13px);
          line-height: 1.5;
          word-break: break-all;
        }

        /* Tech badges — solid cyan background with black text */
        .hp-badges { display: flex; flex-wrap: wrap; gap: 8px; width: 100%; justify-content: flex-start; }
        .hp-badge {
          display: inline-block;
          background: ${CYAN};
          color: #111827;
          border-radius: 999px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(9px, 0.72vw, 11.5px);
          font-weight: 600;
          padding: 4px 13px;
          letter-spacing: 0.04em;
          transition: transform 0.2s;
        }
        .hp-badge:hover { transform: scale(1.05); }

        /* Download CV button */
        .hp-cv {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 90%; 
          border-radius: 999px;
          background: #ffffff;
          color: #0f172a;
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 600;
          padding: 13px 28px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          margin-top: 4px;
        }
        .hp-cv:hover { background: #e4ecfb; transform: translateY(-1px); color: #0f172a; }

        /* ── Code tags ── */
        .ctag {
          display: block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(10px, 0.88vw, 13px);
          color: ${CYAN};
          opacity: 0.8;
          line-height: 1;
          user-select: none;
        }
        .ctag-i {   /* inline variant after heading */
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(9px, 0.65vw, 11px);
          color: ${CYAN};
          opacity: 0.8;
          user-select: none;
          margin-left: 10px;
          vertical-align: baseline;
        }

        /* ── Let's Talk CTA ── */
        .btn-talk {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: ${CYAN};
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(18px, 1.6vw, 24px);
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .btn-talk:hover { opacity: 0.78; color: ${CYAN}; }
        .btn-talk-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width:  clamp(34px, 2.8vw, 42px);
          height: clamp(34px, 2.8vw, 42px);
          border-radius: 50%;
          background: #363F46;
          color: ${CYAN};
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .btn-talk:hover .btn-talk-icon { background: #454E56; }
        .btn-talk-icon svg {
          width: 50%;
          height: 50%;
        }

        /* ── Stats panel ── */
        .stats-panel {
          background: ${BG_STATS};
          border-radius: clamp(30px, 4vw, 50px);
          padding: clamp(30px, 3.5vw, 56px) clamp(22px, 2.5vw, 36px);
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vw, 52px);
          width: 100%;
          max-width: 280px;
        }
        .stat-n {
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(34px, 4.5vw, 62px);
          font-weight: 400;
          color: ${CYAN};
          line-height: 1;
          flex-shrink: 0;
          min-width: clamp(34px, 3.5vw, 62px);
        }
        .stat-l {
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(11.5px, 1vw, 15px);
          color: #ffffff;
          line-height: 1.35;
        }
        .stat-s {
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(10.5px, 0.88vw, 13px);
          color: rgba(255,255,255,0.55);
          line-height: 1.3;
          margin-top: 2px;
        }

        /* ── Entrance animations ── */
        @keyframes hfup {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ha1 { animation: hfup 0.65s cubic-bezier(.22,.68,0,1.2) both 0.05s; }
        .ha2 { animation: hfup 0.65s cubic-bezier(.22,.68,0,1.2) both 0.20s; }
        .ha3 { animation: hfup 0.65s cubic-bezier(.22,.68,0,1.2) both 0.35s; }
      `}</style>

      {/* ── Outer padding container ── */}
      <div
        className="w-full mx-auto
          px-5 py-8
          sm:px-8 sm:py-10
          md:px-12 md:py-12
          lg:px-20 lg:py-14
          xl:px-24 xl:py-16
          2xl:px-32 2xl:py-20"
        style={{ maxWidth: "1920px" }}
      >
        {/*
          ── Responsive grid:
             default/sm/md  →  1 col stacked
             xl             →  12-col, 2 rows (card top-center | text+stats bottom)
             2xl            →  12-col, 1 row  (card | text | stats)
        */}
        <div
          className="
            grid grid-cols-12
            gap-x-6 gap-y-10
            xl:gap-x-8 xl:gap-y-12
            2xl:gap-x-10 2xl:gap-y-0
            items-start
            2xl:items-center
          "
        >
          {/* ─────────────────── PROFILE CARD ─────────────────── */}
          <aside
            className="
              ha1
              col-span-12
              sm:col-span-10 sm:col-start-2
              md:col-span-8  md:col-start-3
              lg:col-span-6  lg:col-start-4
              xl:col-span-6  xl:col-start-4  xl:row-start-1
              2xl:col-span-3 2xl:col-start-1 2xl:row-start-1
            "
          >
            {/* The wrapper that creates the offset margin for the absolute border */}
            <div className="hp-wrap">
              {/* Continuous Cyan (TL) and White (BR) border */}
              <div className="hp-border" aria-hidden="true" />

              {/* Dark card with the same border-radius */}
              <div className="hp-card">

                {/* Avatar */}
                <div className="hp-avatar">
                  <Image
                    src="/profile.jpeg"
                    alt="Caleb Adjeoda"
                    width={120}
                    height={120}
                    style={{ width: "100%", height: "100%", objectFit: "cover", imageRendering: "auto" }}
                    priority
                    quality={100}
                  />
                </div>

                {/* Name & role */}
                <div className="text-center" style={{ lineHeight: 1.3 }}>
                  <p
                    style={{
                      fontSize: "clamp(20px, 1.8vw, 26px)",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    Caleb Kokou Adjeoda
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(11px, 0.95vw, 14px)",
                      color: "rgba(255,255,255,0.75)",
                      marginTop: "6px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Software Engineer
                  </p>
                </div>

                {/* Info rows */}
                <div className="hp-info">
                  <div className="hp-row">
                    <span className="hp-icon"><MailIcon /></span>
                    <span className="hp-text">calebadjeoda@hotmail.com</span>
                  </div>
                  <div className="hp-row">
                    <span className="hp-icon"><PinIcon /></span>
                    <span className="hp-text">Lomé, Togo</span>
                  </div>
                  <div className="hp-row">
                    <span className="hp-icon"><BriefcaseIcon /></span>
                    <span className="hp-text">Full-time / Freelancer</span>
                  </div>
                  <div className="hp-row">
                    <span className="hp-icon"><GlobeIcon /></span>
                    <span className="hp-text">www.calebadjeoda.dev</span>
                  </div>
                </div>

                {/* Tech badges */}
                <div className="hp-badges">
                  {BADGES.map((b) => (
                    <span key={b} className="hp-badge">{b}</span>
                  ))}
                </div>

                {/* Download CV */}
                <Link href="/CalebCV.pdf" target="_blank" className="hp-cv">
                  Download CV
                  <DownloadIcon />
                </Link>

              </div>
            </div>
          </aside>

          {/* ─────────────────── HERO TEXT ─────────────────── */}
          <div
            className="
              ha2
              col-span-12
              xl:col-span-7 xl:col-start-1 xl:row-start-2
              2xl:col-span-6 2xl:col-start-4 2xl:row-start-1
            "
          >
            {/* <h1> */}
            <span className="ctag">&lt;h1&gt;</span>

            {/* Main heading */}
            <h1
              style={{
                fontSize: "clamp(42px, 5.8vw, 88px)",
                fontWeight: 500,
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.015em",
                margin: "8px 0 0 0",
              }}
            >
              Hey
              <br />
              I&apos;m <span style={{ color: CYAN }}>Caleb</span>,
              <br />
              <span style={{ whiteSpace: "nowrap" }}>Full-Stack Developer</span>
              {/* </h1> inline tag */}
              <span className="ctag">&lt;/h1&gt;</span>
            </h1>

            {/* <p> */}
            <span className="ctag" style={{ marginTop: "clamp(24px, 2.5vw, 36px)" }}>
              &lt;p&gt;
            </span>

            {/* Description — indented like real code */}
            <p
              style={{
                fontSize: "clamp(12px, 1.1vw, 15px)",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.7,
                maxWidth: "600px",
                margin: "8px 0 0 clamp(16px, 1.5vw, 24px)",
                fontFamily: "IBM Plex Mono",
              }}
            >
              I craft high-performance web and mobile applications, from robust
              backend architectures to seamless user experiences. If you&apos;re
              looking for a versatile developer to transform complex ideas into
              scalable digital products, let&apos;s build together.
            </p>

            {/* </p> */}
            <span className="ctag" style={{ marginTop: "8px", marginBottom: "clamp(28px, 2.8vw, 42px)" }}>
              &lt;/p&gt;
            </span>

            {/* Let's Talk */}
            <a href="mailto:calebadjeoda@hotmail.com" className="btn-talk">
              Let&apos;s Talk
              <span className="btn-talk-icon">
                <MailIcon />
              </span>
            </a>
          </div>

          {/* ─────────────────── STATS PANEL ─────────────────── */}
          <aside
            className="
              ha3
              col-span-12
              flex justify-center
              sm:col-span-8  sm:col-start-3
              md:col-span-6  md:col-start-4
              lg:col-span-5  lg:col-start-5
              xl:col-span-5  xl:col-start-8  xl:row-start-2  xl:justify-end
              2xl:col-span-3 2xl:col-start-10 2xl:row-start-1 2xl:justify-end
            "
          >
            <div className="stats-panel">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(16px, 1.6vw, 24px)",
                  }}
                >
                  <span className="stat-n">{s.n}</span>
                  <div>
                    <div className="stat-l">{s.label}</div>
                    <div className="stat-s">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Hero;

/* ─── SVG icons ─── */
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 3v4M8 3v4M2 11h20" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
