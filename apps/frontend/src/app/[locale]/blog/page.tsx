import { Navbar, SidebarNav, Footer } from '@/components';
import Blogs from '@/components/Blogs';

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <SidebarNav />
      <main className="min-h-screen">
        <Blogs />
        <Footer />
      </main>
    </>
  );
}
