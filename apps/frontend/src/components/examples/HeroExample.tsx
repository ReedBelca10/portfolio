'use client';

import { Button, Section, Heading, Container, ChevronRightIcon } from '@/components';

/*
 * Example Hero Component
 * Template for a hero section using design system components
 */

export function HeroExample() {
  return (
    <Section padding="xl" variant="accent" fullWidth>
      <Container className="flex flex-col items-center justify-center text-center py-12 md:py-20">
        <Heading level={1} className="text-h1-u text-brand-primary animate-fade-in">
          Welcome to My Portfolio
        </Heading>
        
        <p className="text-article-u text-neutral-grey max-w-2xl mt-6 animate-slide-in-up">
          I am a full-stack developer with passion for creating beautiful and functional web experiences. 
          Let us collaborate to bring your ideas to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-in-up">
          <Button 
            variant="primary" 
            size="lg"
            rightIcon={<ChevronRightIcon size="md" />}
          >
            View My Work
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
          >
            Download Resume
          </Button>
        </div>
      </Container>
    </Section>
  );
}
