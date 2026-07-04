'use client';

import React from 'react';
import Image from 'next/image';

/*
 * Blogs Component
 * Blog section matching the Hero background, featuring a single prominent post
 * and action buttons.
 */

const BG_SECTION = "#292F36";
const CYAN = "#00D9FF";
const TEXT_MUTED = "rgba(255,255,255,0.85)";

export function Blogs() {
  return (
    <section
      id="blog"
      className="py-24 px-6 flex flex-col items-center"
      style={{ backgroundColor: BG_SECTION, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <style>{`
        .blogs-title {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(52px, 6vw, 72px);
          font-weight: 700;
          color: ${CYAN};
          line-height: 1.1;
          margin-bottom: 4px;
        }
        .blogs-underline {
          width: 120px;
          height: 3px;
          margin: 0 auto 20px auto;
          background: linear-gradient(90deg, transparent, ${CYAN} 20%, ${CYAN} 80%, transparent);
          border-radius: 2px;
        }
        .blogs-subtitle {
          font-size: clamp(13px, 1.5vw, 15px);
          color: ${TEXT_MUTED};
          margin-bottom: 48px;
          text-align: center;
        }
        .blogs-separator {
          width: 100%;
          max-width: 800px;
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.8);
          margin: 0;
        }
        .blog-card {
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding: 48px 0;
        }
        @media (min-width: 768px) {
          .blog-card {
            flex-direction: row;
            align-items: stretch;
            gap: 40px;
          }
        }
        .blog-img-wrapper {
          flex-shrink: 0;
          width: 100%;
          aspect-ratio: 1/1;
          position: relative;
          border-radius: 4px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .blog-img-wrapper {
            width: 220px;
            height: 220px;
          }
        }
        .blog-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .blog-post-title {
          font-family: 'Ubuntu', sans-serif;
          font-size: clamp(24px, 2.5vw, 32px);
          color: ${CYAN};
          font-weight: 400;
          line-height: 1.3;
          margin-bottom: 20px;
        }
        .blog-excerpt {
          font-family: 'Ubuntu', sans-serif;
          font-size: 15px;
          color: #E2E8F0;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .blog-readmore {
          font-size: 15px;
          font-family: 'Ubuntu', sans-serif;
          color: ${CYAN};
          text-decoration: underline;
          text-decoration-color: #ffffff;
          text-underline-offset: 4px;
          margin-bottom: 32px;
          display: inline-block;
        }
        .blog-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          font-size: 13px;
          font-family: 'Ubuntu', sans-serif;
        }
        .blog-badge {
          background: #424952;
          color: #E2E8F0;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
        }
        .blog-meta-info {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          color: #E2E8F0;
        }
        .meta-label {
          font-weight: 700;
          color: #ffffff;
        }
        .blogs-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: 48px;
        }
        .btn-cyan {
          background: ${CYAN};
          color: #000;
          font-family: 'Ubuntu', sans-serif;
          font-weight: 500;
          font-size: 16px;
          padding: 12px 32px;
          border-radius: 999px;
          transition: opacity 0.2s;
        }
        .btn-cyan:hover { opacity: 0.8; }
        .btn-outline-cyan {
          background: transparent;
          color: #fff;
          border: 2px solid ${CYAN};
          font-family: 'Ubuntu', sans-serif;
          font-weight: 500;
          font-size: 16px;
          padding: 10px 30px;
          border-radius: 999px;
          transition: background 0.2s;
        }
        .btn-outline-cyan:hover {
          background: rgba(0, 217, 255, 0.1);
        }
      `}</style>

      <div className="flex flex-col items-center text-center">
        <h2 className="blogs-title">Blogs</h2>
        <div className="blogs-underline" />
        <p className="blogs-subtitle">
          My thoughts on technology and business, welcome to subscribe
        </p>
      </div>

      <hr className="blogs-separator" />

      <article className="blog-card">
        <div className="blog-img-wrapper">
          <Image
            src="/Blog.jpg"
            alt="Web developer"
            fill
            className="object-cover"
          />
        </div>
        <div className="blog-content">
          <h3 className="blog-post-title">
            What does it take to<br className="hidden md:block" /> become a web developer?
          </h3>
          <p className="blog-excerpt">
            Web development, also known as website development, encompasses a variety of tasks and
            processes involved in creating websites for the internet...
          </p>
          <div>
            <a href="#" className="blog-readmore">Read More &gt;&gt;</a>
          </div>
          
          <div className="blog-meta">
            <span className="blog-badge">Web Developer</span>
            <div className="blog-meta-info">
              <div><span className="meta-label">Author</span> Caleb</div>
              <div><span className="meta-label">Date</span> 12.Jun 2026</div>
              <div><span className="meta-label">Read</span> 1 Min</div>
            </div>
          </div>
        </div>
      </article>

      <hr className="blogs-separator" />

      <div className="blogs-actions">
        <a href="#" className="btn-cyan">View More</a>
        <a href="#" className="btn-outline-cyan">Subscribe</a>
      </div>
    </section>
  );
}

export default Blogs;
