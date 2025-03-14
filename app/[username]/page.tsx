'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import RepositoryCard from '@/app/components/RepositoryCard';
import SkeletonLoader from '@/app/components/SkeletonLoader';

type Repository = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
  language: string | null;
  html_url: string;
};

type SortOption = 'updated' | 'stars';
type FilterOption = 'all' | 'javascript' | 'typescript' | 'python' | 'other';

export default function UserPage() {
  const { t } = useTranslation('common');
  const { username } = useParams<{ username: string }>();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  const perPage = 10;

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );

        const { ok, status } = response;

        if (!ok) {
          if (status === 404) {
            throw new Error('User not found');
          }
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        setRepositories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchRepositories();
    }
  }, [username]);

  useEffect(() => {
    if (repositories.length === 0) return;

    let filtered = [...repositories];

    if (filterBy !== 'all') {
      if (filterBy === 'other') {
        filtered = filtered.filter(
          (repo) =>
            repo.language?.toLowerCase() !== 'javascript' &&
            repo.language?.toLowerCase() !== 'typescript' &&
            repo.language?.toLowerCase() !== 'python' &&
            repo.language !== null
        );
      } else {
        filtered = filtered.filter(
          (repo) => repo.language?.toLowerCase() === filterBy.toLowerCase()
        );
      }
    }

    if (sortBy === 'updated') {
      filtered.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    } else if (sortBy === 'stars') {
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    setFilteredRepos(filtered);
    setDisplayedRepos(filtered.slice(0, perPage));
    setPage(1);
    setHasMore(filtered.length > perPage);
  }, [repositories, filterBy, sortBy]);

  const loadMore = () => {
    const nextPage = page + 1;
    const newItems = filteredRepos.slice(0, nextPage * perPage);
    setDisplayedRepos(newItems);
    setPage(nextPage);
    setHasMore(newItems.length < filteredRepos.length);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          {error}
        </div>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← {t('search.button')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold ">{username}</h1>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← {t('search.button')}
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              {t('filter.title')}
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="all">{t('filter.all')}</option>
              <option value="javascript">{t('filter.javascript')}</option>
              <option value="typescript">{t('filter.typescript')}</option>
              <option value="python">{t('filter.python')}</option>
              <option value="other">{t('filter.other')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              {t('sort.title')}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="updated">{t('sort.updated')}</option>
              <option value="stars">{t('sort.stars')}</option>
            </select>
          </div>
        </div>

        <div className="self-end">
          {filteredRepos.length}{' '}
          {filteredRepos.length === 1 ? 'repository' : 'repositories'}
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-md">
          {t('search.no_results')}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={displayedRepos.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<SkeletonLoader count={2} />}
          endMessage={
            <p className="text-center text-gray-500 dark:text-gray-400 my-4">
              End of repositories
            </p>
          }
        >
          <div className="grid grid-cols-1 gap-6">
            {displayedRepos.map((repo) => (
              <RepositoryCard
                key={repo.id}
                repository={repo}
                username={username as string}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
