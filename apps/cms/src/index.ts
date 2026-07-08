/**
 * Strapi entry point
 */

export default {
  async bootstrap({ strapi }) {
    console.log('Strapi portfolio is starting');

    // Add mock data for projects
    try {
      const projectCount = await strapi.db.query('api::project.project').count();
      if (projectCount === 0) {
        console.log('Generating mock projects...');
        await strapi.entityService.create('api::project.project', {
          data: {
            title: 'Awesome Portfolio',
            slug: 'awesome-portfolio',
            description: 'My beautiful portfolio built with Next.js and Strapi.',
            content: 'This is a long description of the portfolio project...',
            technologies: ['Next.js', 'React', 'Strapi', 'Tailwind CSS'],
            featured: true,
            link: 'https://myportfolio.com',
            github: 'https://github.com/myusername/portfolio',
            publishedAt: new Date(),
          },
        });
        await strapi.entityService.create('api::project.project', {
          data: {
            title: 'E-commerce Platform',
            slug: 'e-commerce-platform',
            description: 'A full-stack e-commerce solution.',
            content: 'Detailed explanation of the e-commerce platform architecture...',
            technologies: ['Node.js', 'Express', 'PostgreSQL', 'Stripe'],
            featured: false,
            github: 'https://github.com/myusername/ecommerce',
            publishedAt: new Date(),
          },
        });
        console.log('Mock projects generated successfully.');
      }

      const skillCount = await strapi.db.query('api::skill.skill').count();
      if (skillCount === 0) {
        console.log('Generating mock skills...');
        const skills = [
          { name: 'TypeScript', category: 'programming', level: 'advanced', yearsOfExperience: 3 },
          { name: 'React', category: 'programming', level: 'expert', yearsOfExperience: 4 },
          { name: 'Node.js', category: 'programming', level: 'advanced', yearsOfExperience: 3 },
          { name: 'Figma', category: 'design', level: 'intermediate', yearsOfExperience: 2 }
        ];
        for (const skill of skills) {
          await strapi.entityService.create('api::skill.skill', {
            data: {
              ...skill,
            },
          });
        }
        console.log('Mock skills generated successfully.');
      }
    } catch (err) {
      console.error('Failed to generate mock data:', err);
    }
  },
};
