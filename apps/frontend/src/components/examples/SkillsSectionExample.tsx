'use client';

import { Card, Heading, SkillBadge, Section, Container } from '@/components';

/*
 * Example Skills Section Component
 * Template showing skills grid using design system components
 */

interface Skill {
  id: string;
  name: string;
  category: 'html' | 'css' | 'javascript' | 'react' | 'programming' | 'design' | 'tool' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface SkillsSectionExampleProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { id: '1', name: 'React', category: 'react', level: 'expert' },
  { id: '2', name: 'TypeScript', category: 'javascript', level: 'advanced' },
  { id: '3', name: 'Tailwind CSS', category: 'css', level: 'expert' },
  { id: '4', name: 'Node.js', category: 'programming', level: 'advanced' },
  { id: '5', name: 'Next.js', category: 'react', level: 'advanced' },
  { id: '6', name: 'PostgreSQL', category: 'programming', level: 'intermediate' },
];

export function SkillsSectionExample({ skills = defaultSkills }: SkillsSectionExampleProps) {
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <Section padding="lg" variant="default">
      <Container>
        <Heading level={2} className="mb-12">
          Technical Skills
        </Heading>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <Card key={category} variant="outlined" padding="md">
              <Heading level={4} className="capitalize text-brand-primary mb-4">
                {category}
              </Heading>
              
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    name={skill.name}
                    category={skill.category as any}
                    level={skill.level}
                    size="sm"
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
