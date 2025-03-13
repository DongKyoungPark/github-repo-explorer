'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type RepositoryProps = {
  repository: {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    updated_at: string;
    language: string | null;
    html_url: string;
  };
  username: string;
};

export default function RepositoryCard({
  repository,
  username,
}: RepositoryProps) {
  const { t } = useTranslation('common');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <Link
          href={`/${username}/${repository.name}`}
          className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {repository.name}
        </Link>
        <div className="flex items-center mt-2 md:mt-0">
          <span className="flex items-center text-yellow-500 mr-4">
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repository.stargazers_count}
          </span>
          {repository.language && (
            <span className="text-gray-600 dark:text-gray-300">
              {repository.language}
            </span>
          )}
        </div>
      </div>

      {repository.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {repository.description}
        </p>
      )}

      <div className="flex flex-wrap justify-between items-center text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          {t('repository.last_updated')}: {formatDate(repository.updated_at)}
        </span>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 sm:mt-0 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {t('repository.view_on_github')}
        </a>
      </div>
    </div>
  );
}
