import { NextRequest, NextResponse } from 'next/server';
import { fetchBlogs, fetchSkills } from '@/lib/strapi';

const SECTIONS = {
  en: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Works' },
    { id: 'blog', label: 'Blogs' },
    { id: 'contact', label: 'Contact' },
  ],
  fr: [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'projects', label: 'Travaux' },
    { id: 'blog', label: 'Articles' },
    { id: 'contact', label: 'Contact' },
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const locale = searchParams.get('locale') || 'en';

  if (!query || query.trim().length === 0) {
    return NextResponse.json({
      blogs: [],
      skills: [],
      sections: [],
    });
  }

  const normalizedQuery = query.toLowerCase().trim();

  try {
    // Fetch all blogs and skills for the requested locale
    const [allBlogs, allSkills] = await Promise.all([
      fetchBlogs(locale),
      fetchSkills(locale),
    ]);

    // Filter Blogs by title or publication date
    const filteredBlogs = allBlogs.filter((blog: any) => {
      const titleMatch = blog.title?.toLowerCase().includes(normalizedQuery);
      const dateMatch = blog.publishedDate && blog.publishedDate.includes(normalizedQuery);
      return titleMatch || dateMatch;
    });

    // Filter Skills by technology name, category (stack), or subcategory
    const filteredSkills = allSkills.filter((skill: any) => {
      const nameMatch = skill.name?.toLowerCase().includes(normalizedQuery);
      const stackMatch = skill.stack?.toLowerCase().includes(normalizedQuery);
      const subCategoryMatch = skill.subcategory?.toLowerCase().includes(normalizedQuery);
      return nameMatch || stackMatch || subCategoryMatch;
    });

    // Filter Sections
    const sectionsList = SECTIONS[locale as keyof typeof SECTIONS] || SECTIONS.en;
    const filteredSections = sectionsList.filter((section) =>
      section.label.toLowerCase().includes(normalizedQuery) ||
      section.id.toLowerCase().includes(normalizedQuery)
    );

    return NextResponse.json({
      blogs: filteredBlogs.map((b: any) => ({
        id: b.id,
        title: b.title,
        publishedDate: b.publishedDate,
      })),
      skills: filteredSkills.map((s: any) => ({
        id: s.id,
        name: s.name,
        stack: s.stack,
        subcategory: s.subcategory,
      })),
      sections: filteredSections,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An error occurred during the search.' },
      { status: 500 }
    );
  }
}
