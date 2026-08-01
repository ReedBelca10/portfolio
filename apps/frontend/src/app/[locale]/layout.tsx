import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n';
import '../globals.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  // Ensure we have a default title and description
  const title = (messages as any)?.Metadata?.title || 'Caleb Adjeoda | Software Engineer';
  const description = (messages as any)?.Metadata?.description || 'Professional Software Engineer (Full-Stack Developer) portfolio and blog.';

  return {
    metadataBase: new URL('https://calebadjeoda.dev'),
    title: {
      template: '%s | Caleb Adjeoda',
      default: title,
    },
    description: description,
    keywords: ['Software Engineer', 'Computer Scientist', 'Mathematician', 'Computer Science Student', 'Freelance', 'Full-Stack Developer', 'Computer Engineer', 'AI', 'Machine Learning', 'Data Science', 'Portfolio', 'Programmer', 'Web Developer', 'Mobile Development', 'AI Developer', 'Software Developer', 'Caleb Adjeoda', 'B.Eng', 'Computer Engineering'],
    authors: [{ name: 'Caleb Adjeoda', url: 'https://calebadjeoda.dev' }],
    creator: 'Caleb Adjeoda',
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://calebadjeoda.dev',
      title: title,
      description: description,
      siteName: 'Caleb Adjeoda Portfolio',
      images: [
        {
          url: '/og-image.jpg', // Make sure to add this image to public folder if possible, or fallback to icon
          width: 1200,
          height: 630,
          alt: 'Caleb Adjeoda Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      creator: '@calebadjeoda', // Example handle
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/icon.png',
      apple: '/icon.png',
    },
    alternates: {
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
