import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="container-custom">
      <section className="py-20">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-slate-600 mb-8">{t('subtitle')}</p>
        <Link href="#projects" className="btn-primary">
          {t('cta')}
        </Link>
      </section>
    </main>
  );
}
