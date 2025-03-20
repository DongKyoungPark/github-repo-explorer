'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import SkeletonLoader from '../../components/SkeletonLoader';

type RepositoryDetail = {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  open_issues_count: number;
  html_url: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export default function RepositoryDetailPage() {
  const { t } = useTranslation('common');
  const { username, repo } = useParams<{ username: string; repo: string }>();

  const [repository, setRepository] = useState<RepositoryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepositoryDetail = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Repository not found');
          }
          throw new Error('Failed to fetch repository details');
        }

        const data = await response.json();
        setRepository(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (username && repo) {
      fetchRepositoryDetail();
    }
  }, [username, repo]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader count={1} />
      </div>
    );
  }

  if (error || !repository) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-500 rounded-md">
          {error || 'Repository not found'}
        </div>
        <Link
          href={`/${username}`}
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← {t('search.button')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/${username}`} className="text-blue-400 hover:underline">
          ← {username}
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {repository.name}
            </h1>
            {repository.description && (
              <p className="text-gray-300 text-lg mb-4">
                {repository.description}
              </p>
            )}
          </div>

          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            {t('repository.view_on_github')}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">
              {t('repository.stars')}
            </div>
            <div className="flex items-center text-xl font-semibold text-white">
              <svg
                className="w-5 h-5 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {repository.stargazers_count.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">
              {t('repository.forks')}
            </div>
            <div className="flex items-center text-xl font-semibold text-white">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.75 5.75a.75.75 0 00-1.5 0v11.5a.75.75 0 001.5 0V5.75zm7 1a.75.75 0 00-1.5 0v9.5a.75.75 0 001.5 0V6.75z" />
                <path
                  fillRule="evenodd"
                  d="M5 1a3 3 0 00-3 3v16a3 3 0 003 3h14a3 3 0 003-3V4a3 3 0 00-3-3H5zm-.5 3a.5.5 0 01.5-.5h14a.5.5 0 01.5.5v16a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V4z"
                  clipRule="evenodd"
                />
              </svg>
              {repository.forks_count.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">
              {t('repository.issues')}
            </div>
            <div className="flex items-center text-xl font-semibold text-white">
              <svg
                className="w-5 h-5 text-red-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {repository.open_issues_count.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">
              {t('repository.language')}
            </div>
            <div className="text-xl font-semibold text-white">
              {repository.language || '-'}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          {t('repository.last_updated')}: {formatDate(repository.updated_at)}
        </div>
      </div>
    </div>
  );
}
