'use client';

import React from 'react';
import clsx from 'clsx';
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, GitLabIcon, DiscordIcon } from './Icon';

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
    discord?: string;
    gitlab?: string;
    leetcode?: string;
  };
  className?: string;
}

const defaultLegalLinks: FooterLink[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms & Conditions', href: '#terms' },
];

export function Footer({
  copyrightText = `© ${new Date().getFullYear()} Caleb Adjeoda. All rights reserved.`,
  legalLinks = defaultLegalLinks,
  socialLinks = {
    github: 'https://github.com/ReedBelca10',
    linkedin: 'https://www.linkedin.com/in/caleb-adjeoda-410b34415',
    discord: 'https://discord.com/users/1425091386709115007',
    gitlab: 'https://gitlab.com/ReedBelca10',
    leetcode: 'https://leetcode.com/reedbelca10',
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
        'bg-[radial-gradient(circle_at_top_left,_rgba(0,217,255,0.18),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_18%),#071216] border-t border-white/10 mt-16 md:mt-20 lg:mt-24',
        className
      )}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="hidden md:flex flex-wrap items-center justify-between gap-6 md:gap-8">
          <p className="text-xs md:text-sm text-white flex-shrink-0">{copyrightText}</p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center flex-grow">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-base"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex gap-3 md:gap-4 flex-shrink-0 justify-center">
            {socialLinks.github && (
              <button
                onClick={() => handleSocialClick(socialLinks.github)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="GitHub"
              >
                <GitHubIcon size="md" />
              </button>
            )}
            {socialLinks.leetcode && (
              <button
                onClick={() => handleSocialClick(socialLinks.leetcode)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#FFA116]/20 text-white hover:text-[#FFA116] transition-all duration-base"
                aria-label="LeetCode"
              >
                <LeetCodeIcon size="md" />
              </button>
            )}
            {socialLinks.leetcode && (
              <button
                onClick={() => handleSocialClick(socialLinks.leetcode)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#FFA116]/20 text-white hover:text-[#FFA116] transition-all duration-base"
                aria-label="LeetCode"
              >
                <LeetCodeIcon size="md" />
              </button>
            )}
            {socialLinks.leetcode && (
              <button
                onClick={() => handleSocialClick(socialLinks.leetcode)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#FFA116]/20 text-white hover:text-[#FFA116] transition-all duration-base"
                aria-label="LeetCode"
              >
                <LeetCodeIcon size="md" />
              </button>
            )}
            {socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="md" />
              </button>
            )}
            {socialLinks.discord && (
              <button
                onClick={() => handleSocialClick(socialLinks.discord)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="Discord"
              >
                <DiscordIcon size="md" />
              </button>
            )}
            {socialLinks.gitlab && (
              <button
                onClick={() => handleSocialClick(socialLinks.gitlab)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="GitLab"
              >
                <GitLabIcon size="md" />
              </button>
            )}
          </div>
        </div>

        <div className="hidden sm:flex md:hidden flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.github && (
              <button
                onClick={() => handleSocialClick(socialLinks.github)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="GitHub"
              >
                <GitHubIcon size="md" />
              </button>
            )}
            {socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="md" />
              </button>
            )}
            {socialLinks.discord && (
              <button
                onClick={() => handleSocialClick(socialLinks.discord)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="Discord"
              >
                <DiscordIcon size="md" />
              </button>
            )}
            {socialLinks.gitlab && (
              <button
                onClick={() => handleSocialClick(socialLinks.gitlab)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="GitLab"
              >
                <GitLabIcon size="md" />
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
            <p className="text-xs text-white">{copyrightText}</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/80 hover:text-white transition-colors duration-base"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:hidden flex flex-col items-center gap-6 px-2">
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.github && (
              <button
                onClick={() => handleSocialClick(socialLinks.github)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="GitHub"
              >
                <GitHubIcon size="md" />
              </button>
            )}
            {socialLinks.linkedin && (
              <button
                onClick={() => handleSocialClick(socialLinks.linkedin)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size="md" />
              </button>
            )}
            {socialLinks.discord && (
              <button
                onClick={() => handleSocialClick(socialLinks.discord)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="Discord"
              >
                <DiscordIcon size="md" />
              </button>
            )}
            {socialLinks.gitlab && (
              <button
                onClick={() => handleSocialClick(socialLinks.gitlab)}
                className="p-2 rounded-full bg-white/10 hover:bg-[#00D9FF]/20 text-white hover:text-[#00D9FF] transition-all duration-base"
                aria-label="GitLab"
              >
                <GitLabIcon size="md" />
              </button>
            )}
          </div>
          <p className="text-xs text-white text-center">{copyrightText}</p>
          <div className="flex flex-col gap-3 text-center">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-white/80 hover:text-white transition-colors duration-base"
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
