'use client';

import React from 'react';
import clsx from 'clsx';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from './Icon';

/*
 * Footer Component
 * Fully responsive footer with three distinct layouts:
 * Desktop: Single horizontal row with space-between
 * Tablet: Two stacked rows (icons top, links+copyright bottom)
 * Mobile: Fully vertical column layout
 */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  copyrightText?: string;
  legalLinks?: FooterLink[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  className?: string;
}

const defaultLegalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms & Conditions', href: '#terms' },
];

export function Footer({
  copyrightText = `© ${new Date().getFullYear()} All rights reserved.`,
  legalLinks = defaultLegalLinks,
  socialLinks = {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  className,
}: FooterProps) {
  const handleSocialClick = (url: string | undefined) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <footer
      className={clsx(
        'bg-bg-primary border-t border-neutral-grey/20 mt-16 md:mt-20 lg:mt-24',
        className
      )}
    >
      <div className="container-custom py-8 md:py-10 lg:py-12">
        {/* Desktop Layout: Horizontal Row */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* Left: Copyright */}
          <p className="text-xs md:text-sm text-neutral-grey flex-shrink-0">
            {copyrightText}
          </p>

          {/* Center: Legal Links */}
          <div className="flex gap-6 justify-center flex-grow">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm text-neutral-grey hover:text-brand-primary transition-colors duration-base"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Social Icons */}
          <div className="flex gap-4 flex-shrink-0">
            {socialLinks.github && (
              <button
                onClick={() => handleSocialClick(socialLinks.github)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="GitHub"
              >
                <GitHubIcon size="md" />
              </button>
            )}
            {socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="md" />
              </button>
            )}
            {socialLinks.twitter && (
              <button
                onClick={() => handleSocialClick(socialLinks.twitter)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="Twitter"
              >
                <TwitterIcon size="md" />
              </button>
            )}
          </div>
        </div>

        {/* Tablet Layout: Two Stacked Rows */}
        <div className="hidden sm:flex md:hidden flex-col items-center gap-6">
          {/* Top Row: Social Icons */}
          <div className="flex gap-4">
            {socialLinks.github && (
              <button
                onClick={() => handleSocialClick(socialLinks.github)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="GitHub"
              >
                <GitHubIcon size="md" />
              </button>
            )}
            {socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="md" />
              </button>
            )}
            {socialLinks.twitter && (
              <button
                onClick={() => handleSocialClick(socialLinks.twitter)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="Twitter"
              >
                <TwitterIcon size="md" />
              </button>
            )}
          </div>

          {/* Bottom Row: Copyright and Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
            <p className="text-xs text-neutral-grey">{copyrightText}</p>
            <div className="flex gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-neutral-grey hover:text-brand-primary transition-colors duration-base"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout: Fully Vertical Column */}
        <div className="sm:hidden flex flex-col items-center gap-6">
          {/* Top: Social Icons */}
          <div className="flex gap-4">
            {socialLinks.github && (
              <button
                onClick={() => handleSocialClick(socialLinks.github)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="GitHub"
              >
                <GitHubIcon size="md" />
              </button>
            )}
            {socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="md" />
              </button>
            )}
            {socialLinks.twitter && (
              <button
                onClick={() => handleSocialClick(socialLinks.twitter)}
                className="p-2 rounded-full bg-neutral-grey/10 hover:bg-brand-primary/20 text-neutral-grey hover:text-brand-primary transition-all duration-base"
                aria-label="Twitter"
              >
                <TwitterIcon size="md" />
              </button>
            )}
          </div>

          {/* Middle: Copyright */}
          <p className="text-xs text-neutral-grey text-center">{copyrightText}</p>

          {/* Bottom: Legal Links */}
          <div className="flex flex-col gap-3 text-center">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-neutral-grey hover:text-brand-primary transition-colors duration-base"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
