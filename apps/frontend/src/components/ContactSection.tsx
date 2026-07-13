'use client';

import React, { useState } from 'react';
import { submitMessage } from '@/lib/strapi';

const CYAN = '#00D9FF';
const BG = '#071216';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'sending' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus({ type: 'sending', message: '' });

    try {
      await submitMessage(form);
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      const msg = err?.response?.data?.error?.message || 'Failed to send message. Please try again.';
      setStatus({ type: 'error', message: msg });
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[radial-gradient(circle_at_top_left,_rgba(0,217,255,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_18%),#071216] py-16 sm:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2
            style={{ color: CYAN, fontSize: 'clamp(40px, 6.2vw, 72px)', lineHeight: 1 }}
            className="font-semibold"
          >
            Contact
          </h2>
          <div className="mx-auto my-4 w-[120px] sm:w-[140px]">
            <div className="h-0.5 bg-[#00D9FF] mx-auto w-full relative" />
            <div className="flex items-center justify-between mt-2">
              <span className="block w-2 h-2 bg-[#00D9FF] rounded-full mx-auto"></span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/80 mb-8">
            I&apos;m currently available for freelance work
          </p>

          <div className="mx-auto mb-8 sm:mb-10">
            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto items-center justify-center border-2 border-[#00D9FF] text-[#00D9FF] rounded-tr-3xl rounded-bl-3xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-[#00D9FF]/10 transition-all"
            >
              Send Me A Message
            </a>
          </div>
        </div>

        <div
          className="rounded-xl p-6 sm:p-8 md:p-10 lg:p-12 border border-white/10"
          style={{ background: `${BG}F2` }}
        >
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#00D9FF] mb-2">
                  Your name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#00D9FF] mb-2">
                  Your email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#00D9FF] mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#00D9FF] mb-2">
                Your message *
              </label>
              <textarea
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your needs"
                className="w-full bg-transparent border-b-2 border-white/30 text-white py-3 placeholder:text-white/40 focus:outline-none focus:border-[#00D9FF] resize-none transition-colors"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <button
                type="submit"
                disabled={status.type === 'sending'}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#00D9FF] text-[#071216] px-8 py-3 rounded-full font-semibold shadow-lg hover:-translate-y-1 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.type === 'sending' ? (
                  <>
                    Sending...
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#071216" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                    </svg>
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#071216" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>

              {status.type === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-pulse">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {status.message}
                </div>
              )}
              {status.type === 'error' && (
                <div className="text-red-400 text-sm">
                  {status.message}
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="mt-8 sm:mt-10 h-px bg-white/10" />
      </div>
    </section>
  );
}

export default ContactSection;
