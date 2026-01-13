'use client';

import { useTranslations } from 'next-intl';

export default function SkipLink() {
  const t = useTranslations('Common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rtl:focus:left-auto rtl:focus:right-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-white focus:text-brand-dark focus:font-bold focus:shadow-xl focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-offset-2 transition-all"
    >
      {t('skip_to_content')}
    </a>
  );
}
