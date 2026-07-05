'use client';

import React from 'react';
import Image from 'next/image';

/*
 * BlogsPage Component
 * Full standalone blogs page with header, "Subscribe My Blogs" button,
 * and a list of blog posts separated by horizontal rules.
 * Design: dark #292F36 bg, cyan (#00D9FF) accents, IBM Plex Mono font.
 */

const CYAN = '#00D9FF';
const BG_SECTION = '#292F36';

interface BlogPost {
  id: number;
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
  showReadMore?: boolean;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: false,
  },
  {
    id: 2,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 3,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 4,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 5,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '32px',
        padding: '40px 0',
        fontFamily: "'Ubuntu', sans-serif",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          flexShrink: 0,
          width: '160px',
          height: '120px',
          position: 'relative',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        className="blog-page-img"
      >
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
            <a
              href="#"
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
            </a>
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
        paddingBottom: '80px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Ubuntu:wght@400;500;700&display=swap');

        .blogs-page-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 24px 40px;
        }

        .blogs-page-title {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(52px, 6vw, 72px);
          font-weight: 700;
          color: ${CYAN};
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .blogs-page-underline {
          width: 120px;
          height: 3px;
          margin: 0 auto 18px auto;
          background: linear-gradient(90deg, transparent, ${CYAN} 20%, ${CYAN} 80%, transparent);
          border-radius: 2px;
        }

        .blogs-page-subtitle {
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(12px, 1.4vw, 14px);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 36px;
          letter-spacing: 0.02em;
        }

        .blogs-page-subscribe-btn {
          border: 2px solid ${CYAN};
          color: ${CYAN};
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

        /* Responsive: stack image on small screens */
        @media (max-width: 600px) {
          .blog-page-img {
            width: 100% !important;
            height: 180px !important;
          }

          .blogs-page-list article {
            flex-direction: column !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="blogs-page-header">
        <h1 className="blogs-page-title">Blogs</h1>
        <div className="blogs-page-underline" />
        <p className="blogs-page-subtitle">
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
