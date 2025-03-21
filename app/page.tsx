'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Loading from '@/app/components/Loading';

export default function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user data');
      }

      router.push(`/${username}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('app_title')}
          </h1>
          <p className="text-gray-300">{t('search.placeholder')}</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('search.placeholder')}
              className="flex-1 px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loading />
                  {t('search.loading')}
                </span>
              ) : (
                t('search.button')
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
