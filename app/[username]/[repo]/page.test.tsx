import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';
import RepositoryDetailPage from './page';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'search.button': '검색',
        'repository.view_on_github': 'GitHub에서 보기',
        'repository.stars': '별',
        'repository.forks': '포크',
        'repository.issues': '이슈',
        'repository.language': '언어',
        'repository.last_updated': '마지막 업데이트',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('../../components/SkeletonLoader', () => {
  const MockSkeletonLoader = () => (
    <div data-testid="skeleton-loader">로딩 중...</div>
  );
  MockSkeletonLoader.displayName = 'MockSkeletonLoader';
  return MockSkeletonLoader;
});

describe('RepositoryDetailPage', () => {
  const mockRepo = {
    name: 'test-repo',
    description: 'Test repository description',
    stargazers_count: 100,
    forks_count: 20,
    language: 'TypeScript',
    open_issues_count: 5,
    html_url: 'https://github.com/testuser/test-repo',
    updated_at: '2023-06-01T12:00:00Z',
    owner: {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.png',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({
      username: 'testuser',
      repo: 'test-repo',
    });
  });

  it('저장소 데이터를 성공적으로 가져와 표시합니다', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepo,
    }) as jest.Mock;

    render(<RepositoryDetailPage />);

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
    });

    expect(screen.getByText('Test repository description')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    const githubLink = screen.getByText('GitHub에서 보기');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/testuser/test-repo'
    );

    expect(screen.getByText(/June 1, 2023/)).toBeInTheDocument();
  });

  it('한국어 번역이 올바르게 적용됩니다', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepo,
    }) as jest.Mock;

    render(<RepositoryDetailPage />);

    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
    });

    expect(screen.getByText('GitHub에서 보기')).toBeInTheDocument();
    expect(screen.getByText('별')).toBeInTheDocument();
    expect(screen.getByText('포크')).toBeInTheDocument();
    expect(screen.getByText('이슈')).toBeInTheDocument();
    expect(screen.getByText('언어')).toBeInTheDocument();
    expect(screen.getByText(/마지막 업데이트/)).toBeInTheDocument();
  });
});
