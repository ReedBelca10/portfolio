'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { fetchBlogs, subscribeToNewsletter } from '@/lib/strapi';

/*
 * Blogs Component
 * Blog section matching the Hero background, featuring a single prominent post
 * and action buttons.
 */

const BG_SECTION = "#292F36";
const CYAN = "#00D9FF";
const TEXT_MUTED = "rgba(255,255,255,0.85)";

export function Blogs() {
  const locale = useLocale();
  const [latestBlog, setLatestBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs(locale);
        if (data && data.length > 0) {
          setLatestBlog(data[0]);
        }
      } catch (err) {
        console.error('Failed to load latest blog', err);
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
    } catch (err: any) {
      setSubscribeStatus({ type: 'error', message: err.message || 'Failed to subscribe.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateReadTime = (richText: any) => {
    // Basic word count logic for strapi rich text or string
    let text = '';
    if (typeof richText === 'string') {
      text = richText;
    } else if (Array.isArray(richText)) {
      // blocks
      text = JSON.stringify(richText);
    }
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // 200 words per minute
    return `${minutes} Min`;
  };

  const truncateText = (text: string, length = 150) => {
    if (!text) return '';
    const plainText = text.replace(/(<([^>]+)>)/gi, "");
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length) + '...';
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const rawImageUrl = latestBlog?.media?.data?.[0]?.attributes?.url;
  const imageUrl = rawImageUrl 
    ? (rawImageUrl.startsWith('http') ? rawImageUrl : `${API_URL}${rawImageUrl}`) 
    : '/Blog.jpg';

  return (
    <section
      id="blog"
      className="py-24 px-6 flex flex-col items-center relative"
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
          flex-wrap: wrap;
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
        .subscribe-form {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .subscribe-input {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 10px 16px;
          border-radius: 999px;
          outline: none;
          font-family: 'Ubuntu', sans-serif;
        }
        .subscribe-input:focus {
          border-color: ${CYAN};
        }
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
          cursor: pointer;
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

      {loading ? (
        <div className="py-20 text-white/50">Loading latest blog...</div>
      ) : latestBlog ? (
        <article className="blog-card">
          <div className="blog-img-wrapper">
            <Image
              src={imageUrl}
              alt={latestBlog.title || "Blog image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="blog-content">
            <h3 className="blog-post-title">
              {latestBlog.title}
            </h3>
            <p className="blog-excerpt">
              {truncateText(latestBlog.content)}
            </p>
            <div>
              <Link href={`/blog/${latestBlog.documentId || latestBlog.id}`} className="blog-readmore">Read More &gt;&gt;</Link>
            </div>
            
            <div className="blog-meta">
              {latestBlog.seoTags && (
                <span className="blog-badge">{latestBlog.seoTags.split(',')[0]}</span>
              )}
              <div className="blog-meta-info">
                <div><span className="meta-label">Author</span> {latestBlog.author || 'Caleb'}</div>
                <div><span className="meta-label">Date</span> {new Date(latestBlog.publishedDate || latestBlog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div><span className="meta-label">Read</span> {calculateReadTime(latestBlog.content)}</div>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <div className="py-20 text-white/50">No blogs published yet.</div>
      )}

      <hr className="blogs-separator" />

      <div className="blogs-actions">
        <Link href="/blog" className="btn-cyan">View More</Link>
        <form onSubmit={handleSubscribe} className="subscribe-form flex-col sm:flex-row">
          <input 
            type="email" 
            placeholder="Enter your email" 
            required 
            className="subscribe-input"
            value={subscribeEmail}
            onChange={(e) => setSubscribeEmail(e.target.value)}
          />
          <button type="submit" className="btn-outline-cyan" disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
      {subscribeStatus.message && (
        <div className={`mt-4 text-sm ${subscribeStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {subscribeStatus.message}
        </div>
      )}
    </section>
  );
}

export default Blogs;

