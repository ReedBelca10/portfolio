"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   SKILLS SECTION
   Breakpoints:
   ─ mobile  (<640px)   : 1 column
   ─ sm/tablet (640px)  : 2 columns
   ─ md       (768px)   : 2 columns
   ─ lg       (1024px)  : 3 columns
   ─ xl+      (1280px+) : 4 columns
   ───────────────────────────────────────────────────────────────── */

const CYAN = "#00D9FF";
const BORDER_CARD = "#00D9FF";

/* ── Skill data ── */
interface Skill {
  name: string;
  category: string;
  level: "BEGINNER" | "INTERMEDIATE" | "PROFICIENT" | "SENIOR" | "EXPERT";
  percent: number;
  icon: string; // emoji or image path
  useImg?: boolean;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: "monitor" | "server" | "database" | "tool" | "design" | "mobile";
  tags: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Web Development",
    icon: "monitor",
    tags: "HTML · CSS · TS · JS · NEXT.JS · REACT · VITE",
    skills: [
      { name: "REACT", category: "Frontend & UI", level: "SENIOR", percent: 85, icon: "⚛️" },
      { name: "VITE", category: "Frontend & UI", level: "PROFICIENT", percent: 75, icon: "⚡" },
      { name: "NEXT.JS", category: "Frontend & UI", level: "PROFICIENT", percent: 80, icon: "▲" },
      { name: "HTML5 / CSS3", category: "Frontend & UI", level: "SENIOR", percent: 90, icon: "🌐" },
      { name: "JAVASCRIPT", category: "Frontend & UI", level: "SENIOR", percent: 86, icon: "🟨" },
      { name: "TYPESCRIPT", category: "Frontend & UI", level: "SENIOR", percent: 85, icon: "🔷" },
      { name: "TAILWIND CSS", category: "Frontend & UI", level: "SENIOR", percent: 88, icon: "🎨" },
      { name: "SASS / SCSS", category: "Frontend & UI", level: "PROFICIENT", percent: 78, icon: "💅" },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    icon: "server",
    tags: "NODE · NEST · EXPRESS · REST · GRAPHQL",
    skills: [
      { name: "NODE.JS", category: "Backend", level: "SENIOR", percent: 84, icon: "🟢" },
      { name: "NESTJS", category: "Backend", level: "PROFICIENT", percent: 78, icon: "🐱" },
      { name: "EXPRESS", category: "Backend", level: "SENIOR", percent: 82, icon: "🚂" },
      { name: "GRAPHQL", category: "Backend", level: "INTERMEDIATE", percent: 65, icon: "◈" },
      { name: "REST API", category: "Backend", level: "EXPERT", percent: 92, icon: "🔗" },
      { name: "STRAPI", category: "Backend", level: "PROFICIENT", percent: 76, icon: "🎛️" },
    ],
  },
  {
    id: "database",
    label: "Database & DevOps",
    icon: "database",
    tags: "POSTGRESQL · MONGODB · REDIS · DOCKER · GIT",
    skills: [
      { name: "POSTGRESQL", category: "Database", level: "PROFICIENT", percent: 77, icon: "🐘" },
      { name: "MONGODB", category: "Database", level: "PROFICIENT", percent: 75, icon: "🍃" },
      { name: "REDIS", category: "Database", level: "INTERMEDIATE", percent: 62, icon: "🔴" },
      { name: "DOCKER", category: "DevOps", level: "PROFICIENT", percent: 74, icon: "🐳" },
      { name: "GIT / GITHUB", category: "DevOps", level: "SENIOR", percent: 88, icon: "🐙" },
      { name: "LINUX / CLI", category: "DevOps", level: "PROFICIENT", percent: 73, icon: "🐧" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Development",
    icon: "mobile",
    tags: "FLUTTER · DART · REACT NATIVE",
    skills: [
      { name: "FLUTTER", category: "Mobile", level: "PROFICIENT", percent: 80, icon: "💙" },
      { name: "DART", category: "Mobile", level: "PROFICIENT", percent: 78, icon: "🎯" },
      { name: "REACT NATIVE", category: "Mobile", level: "INTERMEDIATE", percent: 60, icon: "📱" },
    ],
  },
  {
    id: "design",
    label: "Design & Tools",
    icon: "design",
    tags: "FIGMA · PHOTOSHOP · ILLUSTRATOR",
    skills: [
      { name: "FIGMA", category: "Design", level: "PROFICIENT", percent: 80, icon: "🎨" },
      { name: "PHOTOSHOP", category: "Design", level: "INTERMEDIATE", percent: 60, icon: "🖼️" },
      { name: "ILLUSTRATOR", category: "Design", level: "BEGINNER", percent: 40, icon: "✏️" },
    ],
  },
];

const LEVEL_COLOR: Record<string, string> = {
  BEGINNER: "#6EE7B7",
  INTERMEDIATE: "#60A5FA",
  PROFICIENT: CYAN,
  SENIOR: CYAN,
  EXPERT: "#F59E0B",
};

/* ── Category Icon ── */
function CategoryIcon({ type }: { type: SkillCategory["icon"] }) {
  const size = "22px";
  const color = CYAN;

  switch (type) {
    case "monitor":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "server":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <circle cx="6" cy="6" r="1" fill={color} stroke="none" />
          <circle cx="6" cy="18" r="1" fill={color} stroke="none" />
        </svg>
      );
    case "database":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "mobile":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <circle cx="12" cy="18" r="1" fill={color} stroke="none" />
        </svg>
      );
    case "design":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

/* ── Single Skill Card ── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const levelColor = LEVEL_COLOR[skill.level] ?? CYAN;

  return (
    <div
      className="skill-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Category label */}
      <span className="skill-category">{skill.category}</span>

      {/* Skill name */}
      <h3 className="skill-name">{skill.name}</h3>

      {/* Icon */}
      <div className="skill-icon-wrap">
        <span className="skill-emoji" role="img" aria-label={skill.name}>
          {skill.icon}
        </span>
      </div>

      {/* Level */}
      <div className="skill-footer">
        <span className="skill-level" style={{ color: levelColor }}>
          {skill.level}
        </span>

        {/* Progress bar */}
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{
              width: `${skill.percent}%`,
              background: `linear-gradient(90deg, ${CYAN}99, ${CYAN})`,
            }}
          />
        </div>
        <span className="skill-percent">{skill.percent}%</span>
      </div>
    </div>
  );
}

/* ── Main Skills Component ── */
export function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  const currentCategory = SKILL_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <section
      id="skills"
      className="skills-section"
      style={{
        backgroundImage: "url('/Skills.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        fontFamily: "IBM Plex Mono, monospace",
      }}
    >
      {/* Scoped styles */}
      <style>{`
        /* ── Section wrapper ── */
        .skills-section {
          position: relative;
          min-height: 100vh;
          padding: clamp(60px, 8vw, 120px) 0;
          overflow: hidden;
        }

        /* Dark blur overlay over the background image */
        .skills-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(20, 26, 32, 0.82);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 0;
        }

        /* ── Content sits above overlay ── */
        .skills-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media (min-width: 640px)  { .skills-inner { padding: 0 32px; } }
        @media (min-width: 768px)  { .skills-inner { padding: 0 48px; } }
        @media (min-width: 1024px) { .skills-inner { padding: 0 80px; } }
        @media (min-width: 1280px) { .skills-inner { padding: 0 96px; } }
        @media (min-width: 1536px) { .skills-inner { padding: 0 128px; } }

        /* ── Title ── */
        .skills-title-container {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .skills-title {
          color: ${CYAN};
          font-size: clamp(32px, 4.5vw, 48px);
          font-weight: 500;
          letter-spacing: 0.05em;
          font-family: "IBM Plex Mono", monospace;
          line-height: 1;
          margin: 0;
        }
        .skills-title-underline {
          display: flex;
          align-items: center;
          width: 90px;
          position: relative;
        }
        .skills-title-underline::before {
          content: '';
          position: absolute;
          left: 4px;
          right: 4px;
          height: 2px;
          background-color: ${CYAN};
          z-index: 1;
        }
        .skills-title-underline .dot {
          width: 6px;
          height: 6px;
          background-color: ${CYAN};
          border-radius: 50%;
          z-index: 2;
        }
        .skills-title-underline .line-spacer {
          flex-grow: 1;
        }
        .skills-subtitle {
          color: rgba(255,255,255,0.85);
          font-size: clamp(11px, 0.9vw, 13px);
          margin-top: 14px;
          line-height: 1.6;
          letter-spacing: 0.02em;
          font-family: "IBM Plex Mono", monospace;
          max-width: 320px;
          text-align: center;
        }
        .skills-header-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
          margin-bottom: clamp(32px, 5vw, 60px);
        }

        /* ── Category tabs (horizontal scroll on mobile) ── */
        .skills-tabs {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          margin-bottom: clamp(28px, 4vw, 48px);
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .skills-tabs::-webkit-scrollbar { display: none; }

        .skills-tab {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: clamp(10px, 1.2vw, 14px) clamp(16px, 1.8vw, 24px);
          border-radius: clamp(12px, 1.5vw, 16px);
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(30, 40, 48, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.6);
          font-family: "IBM Plex Mono", monospace;
          font-size: clamp(12px, 0.9vw, 14px);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
          outline: none;
        }
        .skills-tab:hover {
          border-color: rgba(0, 217, 255, 0.5);
          color: #fff;
          background: rgba(0, 217, 255, 0.08);
        }
        .skills-tab.active {
          border-color: ${CYAN};
          color: ${CYAN};
          background: rgba(0, 217, 255, 0.12);
          box-shadow: 0 0 18px rgba(0, 217, 255, 0.18);
        }
        .skills-tab-tags {
          font-size: clamp(9px, 0.7vw, 11px);
          color: rgba(255,255,255,0.42);
          letter-spacing: 0.04em;
          font-family: "IBM Plex Mono", monospace;
          margin-top: 2px;
        }

        /* ── Skills grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(14px, 2vw, 24px);
        }
        @media (min-width: 640px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1280px) {
          .skills-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* ── Skill card ── */
        @keyframes skillFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skill-card {
          position: relative;
          background: rgba(26, 34, 44, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1.5px solid ${BORDER_CARD};
          border-radius: clamp(14px, 1.8vw, 20px);
          padding: clamp(16px, 2vw, 24px) clamp(14px, 1.8vw, 22px);
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          animation: skillFadeUp 0.45s cubic-bezier(.22,.68,0,1.15) both;
          cursor: default;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 217, 255, 0.15);
        }

        /* Subtle cyan glow on top edge */
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${CYAN}80, transparent);
          border-radius: 50%;
        }

        .skill-category {
          font-size: clamp(10px, 0.8vw, 12px);
          color: ${CYAN};
          letter-spacing: 0.06em;
          font-weight: 500;
          text-transform: uppercase;
          font-family: "IBM Plex Mono", monospace;
        }
        .skill-name {
          font-size: clamp(15px, 1.4vw, 20px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
          margin: 0;
          font-family: "IBM Plex Mono", monospace;
        }
        .skill-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(4px, 0.5vw, 8px) 0;
        }
        .skill-emoji {
          font-size: clamp(30px, 3.5vw, 48px);
          line-height: 1;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
        }
        .skill-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .skill-level {
          font-size: clamp(10px, 0.78vw, 12px);
          font-weight: 600;
          letter-spacing: 0.08em;
          font-family: "IBM Plex Mono", monospace;
        }
        .skill-bar-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.8s cubic-bezier(.22,.68,0,1.2);
        }
        .skill-percent {
          font-size: clamp(10px, 0.76vw, 12px);
          color: rgba(255,255,255,0.5);
          text-align: right;
          font-family: "IBM Plex Mono", monospace;
        }
      `}</style>

      <div className="skills-inner">
        {/* ── Header ── */}
        <div className="skills-header-row">
          <div className="skills-title-container">
            <h2 className="skills-title">Skills</h2>
            <div className="skills-title-underline" aria-hidden="true">
              <span className="dot" />
              <span className="line-spacer" />
              <span className="dot" />
            </div>
          </div>
          <p className="skills-subtitle">I am striving to never stop learning and improving</p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`skillpanel-${cat.id}`}
              id={`skilltab-${cat.id}`}
              className={`skills-tab${activeTab === cat.id ? " active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <CategoryIcon type={cat.icon} />
              <div>
                <div>{cat.label}</div>
                <div className="skills-tab-tags">{cat.tags}</div>
              </div>
            </button>
          ))}
        </div>

        {/* ── Skills Grid ── */}
        <div
          className="skills-grid"
          id={`skillpanel-${currentCategory.id}`}
          role="tabpanel"
          aria-labelledby={`skilltab-${currentCategory.id}`}
        >
          {currentCategory.skills.map((skill, i) => (
            <SkillCard key={`${activeTab}-${skill.name}`} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
