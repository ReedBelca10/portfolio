'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n';
import { BlogPost, BLOG_POSTS } from '@/lib/blogData';

/*
 * BlogsPage Component
 * Full standalone blogs page with header, "Subscribe My Blogs" button,
 * and a list of blog posts separated by horizontal rules.
 * Design: dark #292F36 bg, cyan (#00D9FF) accents, IBM Plex Mono font.
 */

const CYAN = '#00D9FF';
const BG_SECTION = '#292F36';

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col md:flex-row items-start gap-5 md:gap-8 py-8 md:py-10 w-full max-w-[800px] font-primary mx-auto">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-full md:w-[160px] h-[180px] md:h-[120px] rounded overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: 'clamp(18px, 2vw, 22px)',
            fontWeight: 400,
            color: CYAN,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: '14px',
            color: 'rgba(226,232,240,0.9)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {post.excerpt}
        </p>

        {/* Read More link (only on some cards) */}
        {post.showReadMore && (
          <div>
            <Link
              href={`/blog/${post.id}`}
              style={{
                fontFamily: "'Ubuntu', sans-serif",
                fontSize: '14px',
                color: CYAN,
                textDecoration: 'underline',
                textDecorationColor: 'rgba(255,255,255,0.6)',
                textUnderlineOffset: '3px',
              }}
            >
              Read More &gt;&gt;
            </Link>
          </div>
        )}

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginTop: '4px',
          }}
        >
          {/* Tag badge */}
          <span
            style={{
              background: '#424952',
              color: '#E2E8F0',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '11px',
              fontFamily: "'Ubuntu', sans-serif",
            }}
          >
            {post.tag}
          </span>

          {/* Meta info */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              color: '#E2E8F0',
              fontFamily: "'Ubuntu', sans-serif",
            }}
          >
            <span>
              <strong style={{ color: '#fff', fontWeight: 700 }}>Author</strong>{' '}
              {post.author}
            </span>
            <span>
              <strong style={{ color: '#fff', fontWeight: 700 }}>Date</strong>{' '}
              {post.date}
            </span>
            <span>
              <strong style={{ color: '#fff', fontWeight: 700 }}>Read</strong>{' '}
              {post.readTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogsPage() {
  return (
    <section
      style={{
        backgroundColor: BG_SECTION,
        fontFamily: "'IBM Plex Mono', monospace",
        minHeight: '100vh',
        paddingBottom: '48px',
      }}
    >
      <style>{`
        .blogs-page-subscribe-btn {
          border: 2px solid ${CYAN};
          color: #ffffff;
          background: transparent;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          padding: 10px 28px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          letter-spacing: 0.02em;
        }

        .blogs-page-subscribe-btn:hover {
          background: rgba(0, 217, 255, 0.12);
        }

        .blogs-page-separator {
          width: 100%;
          max-width: 800px;
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
          margin: 0 auto;
        }

        .blogs-page-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col items-center text-center px-6 pt-16 pb-10">
        <h2 style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(52px, 6vw, 72px)",
          fontWeight: 700,
          color: CYAN,
          lineHeight: 1.1,
          marginBottom: "4px"
        }}>
          Blogs
        </h2>
        <div style={{
          width: "120px",
          height: "3px",
          margin: "0 auto 20px auto",
          background: `linear-gradient(90deg, transparent, ${CYAN} 20%, ${CYAN} 80%, transparent)`,
          borderRadius: "2px"
        }} />
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(13px, 1.5vw, 15px)",
          color: "rgba(255, 255, 255, 0.85)",
          marginBottom: "36px",
          letterSpacing: "0.02em"
        }}>
          My thoughts on technology and business, welcome to subscribe
        </p>
        <button className="blogs-page-subscribe-btn">Subscribe My Blogs</button>
      </div>

      {/* Blog list */}
      <div className="blogs-page-list">
        {BLOG_POSTS.map((post, idx) => (
          <React.Fragment key={post.id}>
            <hr className="blogs-page-separator" />
            <BlogCard post={post} />
            {idx === BLOG_POSTS.length - 1 && (
              <hr className="blogs-page-separator" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default BlogsPage;
