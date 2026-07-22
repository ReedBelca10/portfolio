'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchWorks } from '@/lib/strapi';
import { useLocale, useTranslations } from 'next-intl';

/*
 * Works Component
 * Project showcase section with dual-monitor display (Source Code + Production),
 * carousel navigation arrows, and code-texture background.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

function getImageUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${API_URL}${url}`;
}

interface StrapiWork {
  id: number;
  title: string;
  description: string;
  sourceCodeLink: string;
  appLink: string;
  sourceCodeImage?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
  appImage?: {
    data?: {
      attributes?: {
        url: string;
      };
    };
  };
}

/* ── Cursor SVG icon (pointer click cursor) ── */
function CursorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4L10.5 20.5L13 13L20.5 10.5L4 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Chevron arrow for navigation ── */
function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Works() {
  const locale = useLocale();
  const t = useTranslations('pages.home.projects');

  const [works, setWorks] = useState<StrapiWork[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorks() {
      try {
        const data = await fetchWorks(locale);
        setWorks(data || []);
      } catch (error) {
        console.error("Failed to load works:", error);
      } finally {
        setLoading(false);
      }
    }
    loadWorks();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === works.length - 1 ? 0 : prev + 1));
  };

  const currentWork = works[currentIndex];

  return (
    <section
      id="projects"
      className="works-section"
    >
      {/* Code-texture background image + dark overlay */}
      <div className="works-bg">
        <Image
          src="/Works.png"
          alt=""
          fill
          className="object-cover"
          priority={false}
          unoptimized
        />
        <div className="works-bg-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="works-content">

        {/* ── Title block ── */}
        <div className="works-title-block">
          <h2 className="works-title">{t('title')}</h2>
          <div className="works-title-underline" />
          <p className="works-subtitle">
            {t('description')}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "#fff", marginTop: "40px", fontFamily: "IBM Plex Mono, monospace" }}>
            {t('loading')}
          </div>
        ) : works.length === 0 ? (
          <div style={{ textAlign: "center", color: "#fff", marginTop: "40px", fontFamily: "IBM Plex Mono, monospace" }}>
            {t('empty')}
          </div>
        ) : (
          <>
            {/* ── Monitors showcase ── */}
            <div className="works-showcase">

              {/* Left arrow */}
              <button
                onClick={goToPrevious}
                className="works-nav-arrow works-nav-arrow--left"
                aria-label="Previous project"
              >
                <ChevronLeft />
              </button>

              {/* Dual monitor display */}
              <div className="works-monitors">

                {/* Source Code monitor (left, behind) */}
                <div className="works-monitor works-monitor--source">
                  <div className="works-monitor__screen works-monitor__screen--dark">
                    <Image
                      src={getImageUrl(currentWork.sourceCodeImage?.data?.attributes?.url) || "/SourceCode.jpg"}
                      alt={`${currentWork.title} Source Code`}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>
                  <div className="works-monitor__stand works-monitor__stand--dark" />
                  <div className="works-monitor__base works-monitor__base--dark" />
                </div>

                {/* Production monitor (right, in front) */}
                <div className="works-monitor works-monitor--production">
                  {/* "View Website" label */}
                  <a
                    href={currentWork.appLink || '#'}
                    className="works-label works-label--website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="works-label__text">{t('viewApp')}</span>
                    <CursorIcon className="works-label__cursor" />
                  </a>

                  <div className="works-monitor__screen works-monitor__screen--light">
                    <Image
                      src={getImageUrl(currentWork.appImage?.data?.attributes?.url) || "/Production.jpg"}
                      alt={`${currentWork.title} App View`}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>
                  <div className="works-monitor__stand works-monitor__stand--light" />
                  <div className="works-monitor__base works-monitor__base--light" />
                </div>

                {/* "View Source Code" label (below left monitor) */}
                <a
                  href={currentWork.sourceCodeLink || '#'}
                  className="works-label works-label--source"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="works-label__text">{t('viewSource')}</span>
                  <CursorIcon className="works-label__cursor" />
                </a>
              </div>

              {/* Right arrow */}
              <button
                onClick={goToNext}
                className="works-nav-arrow works-nav-arrow--right"
                aria-label="Next project"
              >
                <ChevronRight />
              </button>
            </div>

            {/* ── Project Description ── */}
            <div className="works-description-block" style={{ marginTop: '40px', textAlign: 'center', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', padding: '20px', background: 'rgba(18, 24, 30, 0.68)', borderRadius: '12px', border: '1px solid rgba(0, 217, 255, 0.25)', backdropFilter: 'blur(10px)' }}>
              <h3 style={{ color: '#00D9FF', fontFamily: '"IBM Plex Mono", monospace', fontSize: '20px', marginBottom: '12px' }}>{currentWork.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: '"IBM Plex Mono", monospace', fontSize: '14px', lineHeight: '1.6' }}>
                {currentWork.description}
              </p>
            </div>

            {/* ── Dots indicator ── */}
            <div className="works-dots">
              {works.map((work, index) => (
                <button
                  key={work.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`works-dot ${index === currentIndex ? 'works-dot--active' : ''}`}
                  aria-label={`Go to project ${work.title}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Works;
