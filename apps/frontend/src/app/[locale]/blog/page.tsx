import { Navbar, Footer } from '@/components';
import BlogsPage from '@/components/BlogsPage';

import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const title = (messages as any)?.Metadata?.blogTitle || 'Blogs | Caleb Adjeoda';
  const description = (messages as any)?.Metadata?.blogDescription || 'My thoughts on technology, business, and software engineering. Welcome to subscribe.';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      url: `https://calebadjeoda.dev/${locale}/blog`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
  };
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <BlogsPage />
        <Footer className="!mt-0" />
      </main>
    </>
  );
}
