import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import ArticlePage from '@/components/ArticlePage';
import { fetchBlogById, fetchBlogs } from '@/lib/strapi';

export const metadata = {
  title: 'Article | Caleb Portfolio',
  description: 'Read the full article.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  let post = null;
  let relatedBlogs = [];

  try {
    post = await fetchBlogById(resolvedParams.id);
    relatedBlogs = await fetchBlogs();
  } catch (error) {
    console.error('Error fetching blog', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ArticlePage post={post} related={relatedBlogs} />
        <Footer className="!mt-0" />
      </main>
    </>
  );
}
