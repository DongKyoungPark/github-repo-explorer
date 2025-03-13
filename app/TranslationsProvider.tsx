'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initTranslations } from './i18n';
import { defaultLocale } from './i18n-config';
import type { i18n } from 'i18next';

export default function TranslationsProvider({
  children,
  locale = defaultLocale,
  namespaces = ['common'],
}: PropsWithChildren<{
  locale?: string;
  namespaces?: string[];
}>) {
  const [instance, setInstance] = useState<i18n | null>(null);

  useEffect(() => {
    const init = async () => {
      const i18nInstance = await initTranslations(locale, namespaces);
      setInstance(i18nInstance);
    };

    init();
  }, [locale, namespaces]);

  if (!instance) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading translations...
      </div>
    );
  }

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
