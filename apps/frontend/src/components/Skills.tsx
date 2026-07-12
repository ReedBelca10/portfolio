"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchSkills } from "@/lib/strapi";

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
interface StrapiSkill {
  id: number;
  attributes: {
    name: string;
    stack: string;
    subcategory: string;
    proficiency: number;
    icon?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

interface SkillCategory {
  id: string;
  label: string;
  icon: "monitor" | "server" | "database" | "tool" | "design" | "mobile" | "code";
  tags: string;
  skills: StrapiSkill[];
}

const TAB_MAPPING: Record<string, { id: string; icon: SkillCategory["icon"]; tags: string }> = {
  "Programming Languages": { id: "languages", icon: "code", tags: "TS · JS · PYTHON · JAVA · C++" },
  "Web Development": { id: "web", icon: "monitor", tags: "REACT · NEXT.JS · HTML · CSS" },
  "Mobile Development": { id: "mobile", icon: "mobile", tags: "FLUTTER · REACT NATIVE" },
  "Backend Development": { id: "backend", icon: "server", tags: "NODE · NEST · EXPRESS" },
  "Database & DevOps": { id: "database", icon: "database", tags: "POSTGRESQL · MONGODB · DOCKER" },
  "Design & Tools": { id: "design", icon: "design", tags: "FIGMA · GIT · VS CODE" },
};

function getProficiencyLevel(percent: number) {
  if (percent < 40) return "BEGINNER";
  if (percent < 60) return "INTERMEDIATE";
  if (percent < 80) return "PROFICIENT";
  if (percent < 90) return "SENIOR";
  return "EXPERT";
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

function getImageUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

/* ── Category Icon ── */
function CategoryIcon({ type, color = CYAN }: { type: SkillCategory["icon"]; color?: string }) {
  const size = "22px";

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
    case "code":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
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
function SkillCard({ skill, index }: { skill: StrapiSkill; index: number }) {
  const { name, subcategory, proficiency, icon } = skill.attributes;
  const level = getProficiencyLevel(proficiency);
  const imageUrl = getImageUrl(icon?.data?.attributes?.url);

  return (
    <div
      className="skill-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Subcategory label */}
      <span className="skill-category">{subcategory}</span>

      {/* Skill name */}
      <h3 className="skill-name">{name}</h3>

      {/* Icon */}
      <div className="skill-icon-wrap">
        {imageUrl ? (
          <div style={{ position: 'relative', width: '48px', height: '48px' }}>
            <Image 
              src={imageUrl} 
              alt={name} 
              fill 
              style={{ objectFit: 'contain' }} 
              unoptimized
            />
          </div>
        ) : (
          <span className="skill-emoji" role="img" aria-label={name}>
            ⚡
          </span>
        )}
      </div>

      {/* Level */}
      <div className="skill-footer">
        <span className="skill-level" style={{ color: "#ffffff" }}>
          {level}
        </span>

        {/* Progress bar */}
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{
              width: `${proficiency}%`,
              background: `linear-gradient(90deg, ${CYAN}99, ${CYAN})`,
            }}
          />
        </div>
        <span className="skill-percent">{proficiency}%</span>
      </div>
    </div>
  );
}

/* ── Main Skills Component ── */
export function Skills() {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await fetchSkills();
        
        // Group skills by stack
        const grouped = data.reduce((acc: Record<string, StrapiSkill[]>, skill: StrapiSkill) => {
          const stack = skill.attributes.stack;
          if (!acc[stack]) acc[stack] = [];
          acc[stack].push(skill);
          return acc;
        }, {});

        // Format into SkillCategory array
        const formattedCategories: SkillCategory[] = Object.keys(grouped).map(stackName => {
          const mapping = TAB_MAPPING[stackName] || { id: stackName.toLowerCase().replace(/\s+/g, '-'), icon: 'monitor', tags: '' };
          return {
            id: mapping.id,
            label: stackName,
            icon: mapping.icon,
            tags: mapping.tags,
            skills: grouped[stackName],
          };
        });

        setCategories(formattedCategories);
        if (formattedCategories.length > 0) {
          setActiveTab(formattedCategories[0].id);
        }
      } catch (error) {
        console.error("Failed to load skills:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

  const currentCategory = categories.find((c) => c.id === activeTab);

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
          background: rgba(18, 24, 30, 0.68);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
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
          font-size: clamp(12px, 1.05vw, 15px);
          margin-top: 14px;
          line-height: 1.6;
          letter-spacing: 0.02em;
          font-family: "IBM Plex Mono", monospace;
          text-align: center;
          white-space: nowrap;
        }
        .skills-header-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
          margin-bottom: clamp(32px, 5vw, 60px);
        }

        /* ── Category tabs — card style ── */
        .skills-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(8px, 1.2vw, 14px);
          margin-bottom: clamp(28px, 4vw, 48px);
        }

        .skills-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: clamp(14px, 2vw, 22px) clamp(12px, 1.5vw, 20px);
          border-radius: clamp(10px, 1.2vw, 14px);
          border: 1.5px solid rgba(0, 217, 255, 0.25);
          background: rgba(18, 28, 38, 0.72);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: rgba(255,255,255,0.6);
          font-family: "IBM Plex Mono", monospace;
          cursor: pointer;
          transition: all 0.22s ease;
          outline: none;
          text-align: center;
          flex: 1 1 150px;
          max-width: 200px;
        }
        .skills-tab:hover {
          border-color: rgba(0, 217, 255, 0.6);
          color: #fff;
          background: rgba(0, 217, 255, 0.1);
        }
        .skills-tab.active {
          border-color: ${CYAN};
          background: ${CYAN};
          color: #0f1a22;
        }
        .skills-tab.active .skills-tab-icon svg {
          stroke: #0f1a22;
        }
        .skills-tab.active .skills-tab-icon circle {
          fill: #0f1a22;
        }
        .skills-tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .skills-tab-label {
          font-size: clamp(11px, 0.9vw, 14px);
          font-weight: 600;
          letter-spacing: 0.02em;
          font-family: "IBM Plex Mono", monospace;
          line-height: 1.2;
        }
        .skills-tab-tags {
          font-size: clamp(8px, 0.65vw, 10px);
          letter-spacing: 0.05em;
          font-family: "IBM Plex Mono", monospace;
          opacity: 0.7;
          line-height: 1.3;
        }

        /* ── Skills grid ── */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(14px, 2vw, 24px);
          justify-items: center;
          align-items: stretch;
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
          align-items: center;
          text-align: center;
          gap: clamp(8px, 1vw, 12px);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          animation: skillFadeUp 0.45s cubic-bezier(.22,.68,0,1.15) both;
          cursor: default;
          width: 100%;
          max-width: 280px;
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
          text-align: center;
        }
        .skill-name {
          font-size: clamp(15px, 1.4vw, 20px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
          margin: 0;
          font-family: "IBM Plex Mono", monospace;
          text-align: center;
        }
        .skill-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(4px, 0.5vw, 8px) 0;
          width: 100%;
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
          align-items: stretch;
          gap: 6px;
          width: 100%;
        }
        .skill-level {
          font-size: clamp(10px, 0.78vw, 12px);
          font-weight: 600;
          letter-spacing: 0.08em;
          font-family: "IBM Plex Mono", monospace;
          text-align: left;
          color: #ffffff;
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

        {loading ? (
          <div style={{ textAlign: "center", color: "#fff", marginTop: "40px" }}>
            Loading skills...
          </div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: "center", color: "#fff", marginTop: "40px" }}>
            No skills available. Please add some in the CMS.
          </div>
        ) : (
          <>
            {/* ── Category Tabs ── */}
            <div className="skills-tabs" role="tablist" aria-label="Skill categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeTab === cat.id}
                  aria-controls={`skillpanel-${cat.id}`}
                  id={`skilltab-${cat.id}`}
                  className={`skills-tab${activeTab === cat.id ? " active" : ""}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  <span className="skills-tab-icon">
                    <CategoryIcon type={cat.icon} color={activeTab === cat.id ? "#0f1a22" : CYAN} />
                  </span>
                  <span className="skills-tab-label">{cat.label}</span>
                  <span className="skills-tab-tags">{cat.tags}</span>
                </button>
              ))}
            </div>

            {/* ── Skills Grid ── */}
            {currentCategory && (
              <div
                className="skills-grid"
                id={`skillpanel-${currentCategory.id}`}
                role="tabpanel"
                aria-labelledby={`skilltab-${currentCategory.id}`}
              >
                {currentCategory.skills.map((skill, i) => (
                  <SkillCard key={`${activeTab}-${skill.attributes.name}`} skill={skill} index={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Skills;
