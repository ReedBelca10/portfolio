'use client';

import React from 'react';
import clsx from 'clsx';
import { Badge } from './Badge';
import { Button } from './Button';
import { ExternalLinkIcon } from './Icon';

/*
 * BlogColumn Component
 * Blog/article card with image, title, excerpt, metadata, tags, and CTA
 */

interface BlogColumnProps {
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  author: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  className?: string;
}

export function BlogColumn({
  image,
  imageAlt,
  title,
  excerpt,
  date,
  readingTime,
  author,
  tags,
  link,
  featured = false,
  className,
}: BlogColumnProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <article
      className={clsx(
        'group flex flex-col h-full rounded-lg overflow-hidden border border-neutral-grey/20 bg-bg-primary/50 hover:border-brand-primary/50 transition-all duration-base hover:shadow-lg',
        featured && 'md:col-span-2 md:flex-row',
        className
      )}
    >
      {/* Image Container */}
      <div
        className={clsx(
          'relative overflow-hidden bg-neutral-grey/20 flex-shrink-0',
          featured ? 'md:w-2/5' : 'w-full h-48 md:h-56'
        )}
      >
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className={clsx('flex flex-col justify-between p-5 md:p-6', featured && 'md:w-3/5')}>
        {/* Header Info */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <time className="text-xs text-neutral-grey font-medium">{formatDate(date)}</time>
            <span className="text-xs text-neutral-grey font-medium">{readingTime} min read</span>
          </div>

          <h3 className="text-h3-u font-semibold text-neutral-white mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-article-u text-neutral-grey mb-4 line-clamp-3">
            {excerpt}
          </p>
        </div>

        {/* Footer Info */}
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} label={tag} variant="brand" size="sm" />
            ))}
          </div>

          {/* Author and CTA */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-grey font-medium">by {author}</span>
            {link && (
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ExternalLinkIcon size="sm" />}
                onClick={() => window.open(link, '_blank')}
              >
                Read
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
