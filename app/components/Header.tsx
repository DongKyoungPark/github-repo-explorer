'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation('common');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      const shouldUseDarkMode =
        savedTheme === 'dark' || (!savedTheme && prefersDark);

      setIsDarkMode(shouldUseDarkMode);

      if (shouldUseDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        if (savedTheme === 'light') {
          document.documentElement.classList.add('light');
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    localStorage.setItem('theme', newMode ? 'dark' : 'light');

    document.cookie = `theme=${
      newMode ? 'dark' : 'light'
    }; path=/; max-age=31536000`;
  };

  const changeLanguage = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
        >
          {t('app_title')}
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t('header.language')}
            </span>
            <select
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 text-sm rounded-md p-1"
              onChange={(e) => changeLanguage(e.target.value)}
              defaultValue={i18n.language || 'en'}
            >
              <option value="en">English</option>
              <option value="ko">한국어</option>
            </select>
          </div>
          <button
            onClick={toggleTheme}
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            {isDarkMode ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                    clipRule="evenodd"
                  />
                </svg>
                {t('header.light')}
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                {t('header.dark')}
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
