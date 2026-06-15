// Seed script for Strapi
// Usage: npm run seed

const seed = async () => {
  const portfolioData = {
    name: 'Your Name',
    title: 'Full Stack Developer',
    subtitle: 'Building amazing web experiences',
    description:
      'I am a passionate developer with expertise in modern web technologies...',
    email: 'your.email@example.com',
    phone: '+33 6 XX XX XX XX',
    location: 'France',
    socialLinks: {
      twitter: 'https://twitter.com/yourprofile',
      github: 'https://github.com/yourprofile',
      linkedin: 'https://linkedin.com/in/yourprofile',
    },
  };

  console.log('Seeding portfolio data...');
  console.log('Data:', portfolioData);
  console.log('Seed completed!');
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
