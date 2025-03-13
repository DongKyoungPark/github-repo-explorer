export const defaultLocale = 'en';
export const locales = ['en', 'ko'];

export type Locale = (typeof locales)[number];

interface I18nOptions {
  supportedLngs: string[];
  fallbackLng: string;
  lng: string;
  fallbackNS: string;
  defaultNS: string;
  ns: string[];
}

export function getOptions(
  locale: string = defaultLocale,
  namespaces: string[] = ['common']
): I18nOptions {
  return {
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng: locale,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns: namespaces,
  };
}
