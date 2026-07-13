'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BlogCard } from './BlogsPage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { subscribeToNewsletter } from '@/lib/strapi';

const BG_SECTION = '#292F36';
const CYAN = '#00D9FF';

interface ArticlePageProps {
  post: any;
  related?: any[];
}

function ArticleMetaRow({ author, date, readTime, title }: { author: string; date: string; readTime: string; title: string }) {
  const [showShare, setShowShare] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="flex flex-wrap items-center justify-between w-full max-w-[800px] mx-auto py-4 font-primary text-[13px] text-[#E2E8F0]">
      <div className="flex items-center gap-4">
        <span><strong className="text-white font-bold">Author</strong> {author}</span>
        <span><strong className="text-white font-bold">Date</strong> {date}</span>
        <span><strong className="text-white font-bold">Read</strong> {readTime}</span>
      </div>
      <div className="relative">
        <button onClick={() => setShowShare(!showShare)} className="flex items-center justify-center w-8 h-8 rounded-full border border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
        </button>
        {showShare && (
          <div className="absolute right-0 mt-2 py-2 w-36 bg-[#1A222C] rounded-md shadow-xl border border-[#00D9FF]/20 z-10 flex flex-col">
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-[#00D9FF]/10 text-white text-sm text-left transition-colors">Share on X</a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-[#00D9FF]/10 text-white text-sm text-left transition-colors">LinkedIn</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-[#00D9FF]/10 text-white text-sm text-left transition-colors">Facebook</a>
          </div>
        )}
      </div>
    </div>
  );
}

export function ArticlePage({ post, related = [] }: ArticlePageProps) {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);

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

  const author = post.author || 'Caleb';
  const date = new Date(post.publishedDate || post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const readTime = calculateReadTime(post.content);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const rawImageUrl = post.media?.data?.[0]?.attributes?.url;
  const imageUrl = rawImageUrl 
    ? (rawImageUrl.startsWith('http') ? rawImageUrl : `${API_URL}${rawImageUrl}`) 
    : '/Blog.jpg';
  const tags = post.seoTags ? post.seoTags.split(',').map((t: string) => t.trim()) : ['Blog'];

  // Filter out the current post from related
  const relatedPosts = related.filter((p) => (p.documentId || p.id) !== (post.documentId || post.id)).slice(0, 5);

  let rawContent = '';
  if (typeof post.content === 'string') {
    rawContent = post.content;
  } else {
    // Basic fallback if Strapi returns blocks JSON
    rawContent = JSON.stringify(post.content);
  }

  return (
    <section
      style={{
        backgroundColor: BG_SECTION,
        minHeight: '100vh',
        paddingBottom: '48px',
      }}
      className="pt-24 px-6 flex flex-col items-center"
    >
      <style>{`
        .markdown-content p {
          margin-bottom: 1em;
          line-height: 1.8;
        }
        .markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4 {
          color: ${CYAN};
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 400;
        }
        .markdown-content h1 { font-size: 24px; }
        .markdown-content h2 { font-size: 20px; }
        .markdown-content h3 { font-size: 16px; }
        .markdown-content ul, .markdown-content ol {
          margin-left: 20px;
          margin-bottom: 1em;
        }
        .markdown-content li {
          margin-bottom: 0.5em;
        }
        .markdown-content img {
          max-width: 100%;
          border-radius: 4px;
          margin: 1em 0;
        }
        .subscribe-input-article {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 10px 16px;
          border-radius: 999px;
          outline: none;
          font-family: 'Ubuntu', sans-serif;
          margin-right: 8px;
        }
        .subscribe-input-article:focus {
          border-color: ${CYAN};
        }
      `}</style>

      {/* Title */}
      <h1 className="font-primary text-center text-3xl md:text-[32px] text-[#00D9FF] font-normal leading-snug max-w-[800px] mx-auto mb-6">
        {post.title}
      </h1>

      {/* Top Meta */}
      <ArticleMetaRow author={author} date={date} readTime={readTime} title={post.title} />

      {/* Hero Image */}
      <div className="w-full max-w-[800px] aspect-[16/9] md:aspect-[2/1] relative mt-4 mb-10 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="w-full max-w-[800px] font-primary text-[15px] text-[#E2E8F0] leading-[1.8] flex flex-col gap-6 markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {rawContent}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      <div className="w-full max-w-[800px] flex flex-wrap gap-4 mt-12 mb-8 font-primary">
        {tags.map((tag: string, i: number) => (
          <span key={i} className="bg-[#424952] text-[#E2E8F0] px-4 py-1.5 rounded-full text-[12px]">{tag}</span>
        ))}
      </div>

      {/* Bottom Meta */}
      <ArticleMetaRow author={author} date={date} readTime={readTime} title={post.title} />

      {/* Subscribe Button */}
      <div className="w-full max-w-[800px] flex flex-col items-center mt-12 mb-20">
        {!showSubscribeForm ? (
          <button 
            onClick={() => setShowSubscribeForm(true)}
            className="border-2 border-[#00D9FF] text-white bg-transparent font-monospace text-[14px] px-8 py-2.5 rounded-full cursor-pointer transition-colors hover:bg-[#00D9FF]/10 tracking-wide"
          >
            Subscribe My Blogs
          </button>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required 
              className="subscribe-input-article"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
            />
            <button type="submit" className="border-2 border-[#00D9FF] text-[#000] bg-[#00D9FF] font-monospace text-[14px] px-8 py-2.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity tracking-wide" disabled={isSubmitting}>
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

      {/* You Might Also Like Section */}
      {relatedPosts.length > 0 && (
        <div className="w-full max-w-[800px] flex flex-col items-center mt-8">
          <h2 className="text-[#00D9FF] font-primary text-3xl md:text-[32px] mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="w-full flex flex-col">
            {relatedPosts.map((relatedPost, idx) => (
              <React.Fragment key={relatedPost.id || relatedPost.documentId}>
                {idx > 0 && <hr className="w-full border-t border-white/20 my-0" />}
                <BlogCard post={relatedPost} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ArticlePage;
