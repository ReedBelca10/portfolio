'use client';

import { Card, Heading, Badge, Button, ExternalLinkIcon } from '@/components';

/*
 * Example Project Card Component
 * Template for displaying a project with design system components
 */

interface ProjectCardExampleProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  featured?: boolean;
  className?: string;
}

export function ProjectCardExample({
  title,
  description,
  technologies,
  link,
  featured = false,
  className,
}: ProjectCardExampleProps) {
  const techVariantMap: Record<string, 'html' | 'css' | 'javascript' | 'react' | 'brand' | 'neutral'> = {
    HTML: 'html',
    CSS: 'css',
    JavaScript: 'javascript',
    'React': 'react',
    'Next.js': 'react',
    'TypeScript': 'javascript',
    'Node.js': 'javascript',
    'PostgreSQL': 'brand',
  };

  return (
    <Card
      variant={featured ? 'elevated' : 'outlined'}
      padding="lg"
      className={`group hover:shadow-2xl transition-all duration-base ${className || ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <Heading level={3}>{title}</Heading>
        {featured && (
          <span className="px-2 py-1 bg-brand-primary/20 text-brand-primary text-xs font-bold rounded">
            Featured
          </span>
        )}
      </div>

      <p className="text-neutral-grey mb-4">{description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            label={tech}
            variant={techVariantMap[tech] || 'brand'}
            size="sm"
          />
        ))}
      </div>

      <div className="flex gap-3">
        {link && (
          <Button
            variant="outline"
            size="sm"
            rightIcon={<ExternalLinkIcon size="sm" />}
            onClick={() => window.open(link, '_blank')}
          >
            View Project
          </Button>
        )}
        <Button variant="ghost" size="sm">
          Learn More
        </Button>
      </div>
    </Card>
  );
}
