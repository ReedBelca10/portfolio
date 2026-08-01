import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@/components';
import ArticlePage from '@/components/ArticlePage';
import { fetchBlogById, fetchBlogs } from '@/lib/strapi';

import type { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; id: string }> }
): Promise<Metadata> {
  const { locale, id } = await params;
  
  try {
    const post = await fetchBlogById(id, locale);
    if (!post) return { title: 'Article Not Found | Caleb Adjeoda' };

    const title = post.title || 'Blog Article';
    const description = post.preview || post.description || 'Read the full article on Caleb Adjeoda\'s blog.';
    
    // Attempt to extract an image if available from Strapi
    let imageUrl = '';
    if (post.image?.data?.attributes?.url) {
      imageUrl = post.image.data.attributes.url;
      // if it's a relative url from Strapi, prepend the API domain or handle it.
      // Assuming getImageUrl helper is usually used, but here we can just pass the URL
      // if we have a full URL or know the domain
      if (imageUrl.startsWith('/')) {
        imageUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://api.calebadjeoda.dev') + imageUrl;
      }
    }

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        url: `https://calebadjeoda.dev/${locale}/blog/${id}`,
        ...(imageUrl && {
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        ...(imageUrl && { images: [imageUrl] }),
      },
    };
  } catch (e) {
    return {
      title: 'Article | Caleb Adjeoda',
    };
  }
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const resolvedParams = await params;
  let post = null;
  let relatedBlogs = [];

  try {
    post = await fetchBlogById(resolvedParams.id, resolvedParams.locale);
    relatedBlogs = await fetchBlogs(resolvedParams.locale);
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
