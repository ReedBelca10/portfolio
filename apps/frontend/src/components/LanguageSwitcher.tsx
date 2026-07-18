'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      const currentPathWithoutLocale = pathname.replace(`/${locale}`, '');
      router.replace(`/${nextLocale}${currentPathWithoutLocale || '/'}`);
    });
  };

  return (
    <div className="relative inline-block">
      <select
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
        className="appearance-none bg-transparent text-white/80 hover:text-white font-mono text-sm border border-white/20 rounded-md px-3 py-1 pr-8 outline-none focus:border-[#00D9FF] transition-colors cursor-pointer"
        aria-label="Select Language"
      >
        <option value="en" className="text-black">EN</option>
        <option value="fr" className="text-black">FR</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/80">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
