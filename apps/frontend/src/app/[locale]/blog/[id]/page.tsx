import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import ArticlePage from '@/components/ArticlePage';
import { BLOG_POSTS } from '@/lib/blogData';

export const metadata = {
  title: 'Article | My Portfolio',
  description: 'Read the full article.',
};

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);
  const post = BLOG_POSTS.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ArticlePage post={post} />
        <Footer className="!mt-0" />
      </main>
    </>
  );
}
