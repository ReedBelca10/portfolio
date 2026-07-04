'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/*
 * Works Component
 * Project showcase section with dual-monitor display (Source Code + Production),
 * carousel navigation arrows, and code-texture background.
 */

/* ── Static project data (will be replaced by Strapi data later) ── */
const PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    websiteUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    websiteUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 3,
    title: 'Mobile App',
    websiteUrl: '#',
    sourceUrl: '#',
  },
];

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

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
          quality={80}
          priority={false}
        />
        <div className="works-bg-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="works-content">

        {/* ── Title block ── */}
        <div className="works-title-block">
          <h2 className="works-title">Works</h2>
          <div className="works-title-underline" />
          <p className="works-subtitle">
            I had the pleasure of working with these awesome projects
          </p>
        </div>

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
                  src="/SourceCode.png"
                  alt="Source code view"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="works-monitor__stand works-monitor__stand--dark" />
              <div className="works-monitor__base works-monitor__base--dark" />
            </div>

            {/* Production monitor (right, in front) */}
            <div className="works-monitor works-monitor--production">
              {/* "View Website" label */}
              <a
                href={PROJECTS[currentIndex]?.websiteUrl || '#'}
                className="works-label works-label--website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="works-label__text">View App</span>
                <CursorIcon className="works-label__cursor" />
              </a>

              <div className="works-monitor__screen works-monitor__screen--light">
                <Image
                  src="/Production.png"
                  alt="Production website view"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="works-monitor__stand works-monitor__stand--light" />
              <div className="works-monitor__base works-monitor__base--light" />
            </div>

            {/* "View Source Code" label (below left monitor) */}
            <a
              href={PROJECTS[currentIndex]?.sourceUrl || '#'}
              className="works-label works-label--source"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="works-label__text">View Source Code</span>
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

        {/* ── Dots indicator ── */}
        <div className="works-dots">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setCurrentIndex(index)}
              className={`works-dot ${index === currentIndex ? 'works-dot--active' : ''}`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Works;
