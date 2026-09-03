'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BlogCard } from './BlogsPage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocale, useTranslations } from 'next-intl';
import { subscribeToNewsletter } from '@/lib/strapi';

const BG_SECTION = '#292F36';
const CYAN = '#00D9FF';

interface ArticlePageProps {
  post: any;
  related?: any[];
}

/* ── Social Share Icons ── */
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? '#FF4D6A' : 'none'}
      stroke={filled ? '#FF4D6A' : 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function LikeButton({ blogId, initialLikes, t }: { blogId: string | number; initialLikes: number; t: any }) {
  const storageKey = `blog_liked_${blogId}`;
  const [liked, setLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(storageKey) === 'true';
    }
    return false;
  });
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sync localStorage on mount (for SSR hydration)
  React.useEffect(() => {
    setLiked(localStorage.getItem(storageKey) === 'true');
  }, [storageKey]);

  const handleLike = async () => {
    if (liked) return; // Already liked

    setIsAnimating(true);
    setLiked(true);
    setLikeCount((prev) => prev + 1);
    localStorage.setItem(storageKey, 'true');

    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });
      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.likes);
      }
    } catch (err) {
      console.error('Failed to like:', err);
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <>
      <style>{`
        @keyframes likeHeartPop {
          0%   { transform: scale(1); }
          30%  { transform: scale(1.35); }
          50%  { transform: scale(0.95); }
          70%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes likeParticle {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-24px) scale(0.5); }
        }
        .like-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 999px;
          border: 2px solid rgba(255, 77, 106, 0.3);
          background: rgba(255, 77, 106, 0.05);
          color: #E2E8F0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: visible;
        }
        .like-btn:hover:not(.like-btn--liked) {
          border-color: rgba(255, 77, 106, 0.6);
          background: rgba(255, 77, 106, 0.1);
          color: #FF4D6A;
        }
        .like-btn--liked {
          border-color: #FF4D6A;
          background: rgba(255, 77, 106, 0.12);
          color: #FF4D6A;
          cursor: default;
        }
        .like-btn__icon {
          display: flex;
          align-items: center;
        }
        .like-btn__icon--animating {
          animation: likeHeartPop 0.6s ease forwards;
        }
        .like-btn__count {
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          min-width: 16px;
        }
        .like-particles {
          position: absolute;
          top: 50%;
          left: 20px;
          pointer-events: none;
        }
        .like-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF4D6A;
          animation: likeParticle 0.6s ease-out forwards;
        }
      `}</style>
      <button
        onClick={handleLike}
        className={`like-btn ${liked ? 'like-btn--liked' : ''}`}
        aria-label={liked ? t('liked') : t('like')}
        disabled={liked}
      >
        <span className={`like-btn__icon ${isAnimating ? 'like-btn__icon--animating' : ''}`}>
          <HeartIcon filled={liked} />
        </span>
        <span className="like-btn__count">{likeCount}</span>
        <span>{liked ? t('liked') : t('like')}</span>
        {isAnimating && (
          <span className="like-particles">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="like-particle"
                style={{
                  left: `${Math.random() * 20 - 10}px`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </span>
        )}
      </button>
    </>
  );
}

function SharePanel({ title, onClose, t }: { title: string; onClose: () => void; t: any }) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const [copied, setCopied] = useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback ignored */ }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const networks = [
    { label: 'X (Twitter)', icon: <XIcon />, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, color: '#000' },
    { label: 'LinkedIn', icon: <LinkedInIcon />, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, color: '#0A66C2' },
    { label: 'Facebook', icon: <FacebookIcon />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`, color: '#1877F2' },
    { label: 'WhatsApp', icon: <WhatsAppIcon />, href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, color: '#25D366' },
  ];

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        right: 0,
        top: '100%',
        marginTop: '12px',
        width: 'calc(100vw - 32px)',
        maxWidth: '260px',
        background: 'rgba(18, 24, 32, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        zIndex: 50,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,217,255,0.08)',
        animation: 'sharePanelIn 0.2s ease-out',
      }}
    >
      <style>{`
        @keyframes sharePanelIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .share-net-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: #E2E8F0;
          font-size: 13px;
          font-family: 'IBM Plex Mono', monospace;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
        }
        .share-net-btn:hover {
          background: rgba(0, 217, 255, 0.1);
          color: #fff;
        }
        .share-net-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          flex-shrink: 0;
        }
      `}</style>

      <p style={{ margin: '0 0 14px 0', fontSize: '12px', fontWeight: 600, color: '#00D9FF', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'IBM Plex Mono', monospace" }}>
        {t('shareArticle')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {networks.map((net) => (
          <a
            key={net.label}
            href={net.href}
            target="_blank"
            rel="noopener noreferrer"
            className="share-net-btn"
          >
            <span className="share-net-icon" style={{ background: net.color, color: '#fff' }}>
              {net.icon}
            </span>
            {net.label}
          </a>
        ))}

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '6px 0' }} />

        {/* Copy link */}
        <button onClick={handleCopy} className="share-net-btn">
          <span className="share-net-icon" style={{ background: 'rgba(0, 217, 255, 0.15)', color: '#00D9FF' }}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </span>
          {copied ? t('linkCopied') : t('copyLink')}
        </button>
      </div>
    </div>
  );
}

function ArticleMetaRow({ author, date, readTime, title, t }: { author: string; date: string; readTime: string; title: string; t: any }) {
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between w-full max-w-[800px] mx-auto py-4 font-primary text-[13px] text-[#E2E8F0] gap-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span><strong className="text-white font-bold">{t('author')}</strong> {author}</span>
        <span><strong className="text-white font-bold">{t('date')}</strong> {date}</span>
        <span><strong className="text-white font-bold">{t('read')}</strong> {readTime}</span>
      </div>
      <div className="relative ml-auto">
        <button
          onClick={() => setShowShare(!showShare)}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-colors shrink-0"
          aria-label="Share this article"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        {showShare && <SharePanel title={title} onClose={() => setShowShare(false)} t={t} />}
      </div>
    </div>
  );
}

function GistEmbed({ url }: { url: string }) {
  const iframeSrc = `
    <html>
      <head>
        <base target="_blank" />
        <style>
          body { margin: 0; padding: 0; background: transparent; }
          .gist { width: 100%; margin: 0; }
        </style>
      </head>
      <body>
        <script src="${url}.js"></script>
        <script>
          function sendHeight() {
            const height = document.body.scrollHeight;
            window.parent.postMessage({ type: 'resize-gist', height, url: '${url}' }, '*');
          }
          window.onload = sendHeight;
          if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(sendHeight).observe(document.body);
          }
        </script>
      </body>
    </html>
  `;

  const [height, setHeight] = React.useState(300);

  React.useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'resize-gist' && e.data.url === url) {
        setHeight(e.data.height + 20); // Add a small buffer to prevent scrollbars
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [url]);

  return (
    <div className="my-6 w-full max-w-full overflow-hidden bg-white/5 rounded-lg border border-white/10 pt-4 px-4 pb-0">
      <iframe
        srcDoc={iframeSrc}
        width="100%"
        height={height}
        className="w-full border-0"
        style={{ colorScheme: 'light' }}
        title="GitHub Gist"
      />
    </div>
  );
}

export function ArticlePage({ post, related = [] }: ArticlePageProps) {
  const locale = useLocale();
  const t = useTranslations('pages.home.blogSection');
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
      setSubscribeStatus({ type: 'success', message: t('subscribeSuccess') });
      setSubscribeEmail('');
      setTimeout(() => setShowSubscribeForm(false), 3000);
    } catch (err: any) {
      setSubscribeStatus({ type: 'error', message: err.message || t('subscribeFail') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const author = post.author || 'Caleb';
  const date = new Date(post.publishedDate || post.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
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
        .markdown-content pre {
          overflow-x: auto;
          max-width: 100%;
          background: rgba(0, 0, 0, 0.2);
          padding: 1em;
          border-radius: 4px;
        }
        .markdown-content code {
          word-break: break-word;
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
          width: 100%;
        }
        .subscribe-input-article:focus {
          border-color: ${CYAN};
        }
      `}</style>

      {/* Title */}
      <h1 className="font-primary text-center text-3xl md:text-[32px] text-[#00D9FF] font-normal leading-snug max-w-[800px] w-full mx-auto mb-6 break-words">
        {post.title}
      </h1>

      {/* Top Meta */}
      <ArticleMetaRow author={author} date={date} readTime={readTime} title={post.title} t={t} />

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
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ node, href, children, ...props }: any) => {
              if (!href) return <a {...props}>{children}</a>;
              let url = href.trim();
              url = url.startsWith('http') ? url : `${API_URL}${url}`;
              
              // Handle GitHub Gists
              if (url.includes('gist.github.com/')) {
                const baseGistUrl = url.split('?')[0].split('#')[0];
                return <GistEmbed url={baseGistUrl} />;
              }

              const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i);
              const isAudio = url.match(/\.(mp3|wav|ogg)$/i);
              const isImage = url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
              const isDocument = url.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|txt|csv|rtf)$/i);
              const isCode = url.match(/\.(js|jsx|ts|tsx|py|java|c|cpp|h|cs|go|rb|php|swift|rs|kt|sh|bat|json|yml|yaml|xml|sql|html|css|md|vue|svelte)$/i);

              const DownloadIcon = () => (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              );

              if (isVideo) {
                return (
                  <div className="flex flex-col items-start my-6 w-full">
                    <video controls className="w-full rounded bg-black/20" src={url} />
                    <a href={url} download target="_blank" rel="noopener noreferrer" className="mt-2 text-[#00D9FF] hover:underline flex items-center gap-1 text-sm font-monospace">
                      <DownloadIcon />
                      Download Video
                    </a>
                  </div>
                );
              }
              if (isAudio) {
                return (
                  <div className="flex flex-col items-start my-6 w-full">
                    <audio controls className="w-full" src={url} />
                    <a href={url} download target="_blank" rel="noopener noreferrer" className="mt-2 text-[#00D9FF] hover:underline flex items-center gap-1 text-sm font-monospace">
                      <DownloadIcon />
                      Download Audio
                    </a>
                  </div>
                );
              }
              if (isImage) {
                return (
                  <div className="flex flex-col items-center my-6 w-full">
                    <img src={url} alt="Markdown content" className="max-w-full rounded max-h-[600px] object-contain bg-black/20" />
                    <a href={url} download target="_blank" rel="noopener noreferrer" className="mt-2 text-[#00D9FF] hover:underline flex items-center gap-1 text-sm font-monospace self-start">
                      <DownloadIcon />
                      Download Image
                    </a>
                  </div>
                );
              }
              if (isDocument || isCode) {
                const label = isCode ? 'Download Code' : 'Download File';
                const Icon = isCode ? () => (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                ) : () => (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="12" y2="18"></line>
                    <line x1="15" y1="15" x2="12" y2="18"></line>
                  </svg>
                );

                return (
                  <a href={url} download target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded my-2 text-[#00D9FF] hover:bg-white/10 transition-colors w-fit">
                    <Icon />
                    {children || label}
                  </a>
                );
              }

              return (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#00D9FF] underline hover:no-underline break-words" {...props}>
                  {children}
                </a>
              );
            },
            img: ({ node, src, alt, ...props }: any) => {
              if (!src) return <img alt={alt} {...props} />;
              const url = src.startsWith('http') ? src : `${API_URL}${src}`;
              return (
                <div className="flex flex-col items-center my-6 w-full">
                  <img src={url} alt={alt || 'Markdown image'} className="max-w-full rounded max-h-[600px] object-contain bg-black/20" {...props} />
                  <a href={url} download target="_blank" rel="noopener noreferrer" className="mt-2 text-[#00D9FF] hover:underline flex items-center gap-1 text-sm font-monospace self-start">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Image
                  </a>
                </div>
              );
            }
          }}
        >
          {rawContent}
        </ReactMarkdown>
      </div>

      {/* Tags + Like Row */}
      <div className="w-full max-w-[800px] flex flex-wrap items-center justify-between mt-12 mb-8 font-primary gap-6">
        <div className="flex flex-wrap gap-4">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="bg-[#424952] text-[#E2E8F0] px-4 py-1.5 rounded-full text-[12px]">{tag}</span>
          ))}
        </div>
        <div className="ml-auto">
          <LikeButton blogId={post.documentId || post.id} initialLikes={post.likes || 0} t={t} />
        </div>
      </div>

      {/* Bottom Meta */}
      <ArticleMetaRow author={author} date={date} readTime={readTime} title={post.title} t={t} />

      {/* Subscribe Button */}
      <div className="w-full max-w-[800px] flex flex-col items-center mt-12 mb-20">
        {!showSubscribeForm ? (
          <button 
            onClick={() => setShowSubscribeForm(true)}
            className="border-2 border-[#00D9FF] text-white bg-transparent font-monospace text-[14px] px-8 py-2.5 rounded-full cursor-pointer transition-colors hover:bg-[#00D9FF]/10 tracking-wide"
          >
            {t('subscribeBtn')}
          </button>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4">
            <input 
              type="email" 
              placeholder={t('emailPlaceholder')} 
              required 
              className="subscribe-input-article"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
            />
            <button type="submit" className="border-2 border-[#00D9FF] text-[#000] bg-[#00D9FF] font-monospace text-[14px] px-8 py-2.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity tracking-wide" disabled={isSubmitting}>
              {isSubmitting ? t('subscribing') : t('submit')}
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
            {t('relatedTitle')}
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
