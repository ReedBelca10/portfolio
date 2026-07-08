import { Navbar, Footer } from '@/components';
import BlogsPage from '@/components/BlogsPage';

export const metadata = {
  title: 'Caleb Portfolio - Blogs',
  description: 'My thoughts on technology and business. Welcome to subscribe.',
};

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
