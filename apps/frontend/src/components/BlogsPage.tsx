'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlogs, subscribeToNewsletter } from '@/lib/strapi';

/*
 * BlogsPage Component
 * Full standalone blogs page with header, "Subscribe My Blogs" button,
 * and a list of blog posts separated by horizontal rules.
 * Design: dark #292F36 bg, cyan (#00D9FF) accents, IBM Plex Mono font.
 */

const CYAN = '#00D9FF';
const BG_SECTION = '#292F36';

export function BlogCard({ post }: { post: any }) {
  const truncateText = (text: string, length = 150) => {
    if (!text) return '';
    const plainText = text.replace(/(<([^>]+)>)/gi, "");
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length) + '...';
  };

  const calculateReadTime = (richText: any) => {
    let text = '';
    if (typeof richText === 'string') {
      text = richText;
    } else if (Array.isArray(richText)) {
      text = JSON.stringify(richText);
    }
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} Min`;
  };

  const id = post.documentId || post.id;
  const title = post.title;
  const excerpt = truncateText(post.content, 200);
  const author = post.author || 'Caleb';
  const date = new Date(post.publishedDate || post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const readTime = calculateReadTime(post.content);
  const tag = post.seoTags ? post.seoTags.split(',')[0] : 'Blog';
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const rawImageUrl = post.media?.data?.[0]?.attributes?.url;
  const imageUrl = rawImageUrl 
    ? (rawImageUrl.startsWith('http') ? rawImageUrl : `${API_URL}${rawImageUrl}`) 
    : '/Blog.jpg';

  return (
    <article className="flex flex-col md:flex-row items-start gap-5 md:gap-8 py-8 md:py-10 w-full max-w-[800px] font-primary mx-auto">
      {/* Thumbnail */}
      <div className="relative shrink-0 w-full md:w-[160px] h-[180px] md:h-[120px] rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
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
          {title}
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
          {excerpt}
        </p>

        {/* Read More link */}
        <div>
          <Link
            href={`/blog/${id}`}
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
            {tag}
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
              {author}
            </span>
            <span>
              <strong style={{ color: '#fff', fontWeight: 700 }}>Date</strong>{' '}
              {date}
            </span>
            <span>
              <strong style={{ color: '#fff', fontWeight: 700 }}>Read</strong>{' '}
              {readTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs();
        if (data) {
          setBlogs(data);
        }
      } catch (err) {
        console.error('Failed to load blogs', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setIsSubmitting(true);
    setSubscribeStatus({ type: null, message: '' });
    try {
      await subscribeToNewsletter(subscribeEmail);
      setSubscribeStatus({ type: 'success', message: 'Successfully subscribed!' });
      setSubscribeEmail('');
      setTimeout(() => setShowSubscribeForm(false), 3000);
    } catch (err: any) {
      setSubscribeStatus({ type: 'error', message: err.message || 'Failed to subscribe.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        .subscribe-form-page {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-top: 16px;
        }

        .subscribe-input-page {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 10px 16px;
          border-radius: 999px;
          outline: none;
          font-family: 'Ubuntu', sans-serif;
        }

        .subscribe-input-page:focus {
          border-color: ${CYAN};
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

        {!showSubscribeForm ? (
          <button onClick={() => setShowSubscribeForm(true)} className="blogs-page-subscribe-btn">Subscribe My Blogs</button>
        ) : (
          <form onSubmit={handleSubscribe} className="subscribe-form-page flex-col sm:flex-row">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="subscribe-input-page"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
            />
            <button type="submit" className="blogs-page-subscribe-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Submit'}
            </button>
          </form>
        )}
        
        {subscribeStatus.message && (
          <div className={`mt-4 text-sm ${subscribeStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {subscribeStatus.message}
          </div>
        )}
      </div>

      {/* Blog list */}
      <div className="blogs-page-list">
        {loading ? (
          <div className="py-20 text-white/50">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-white/50">No blogs found.</div>
        ) : (
          blogs.map((post, idx) => (
            <React.Fragment key={post.id}>
              <hr className="blogs-page-separator" />
              <BlogCard post={post} />
              {idx === blogs.length - 1 && (
                <hr className="blogs-page-separator" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </section>
  );
}

export default BlogsPage;

