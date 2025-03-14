import React from 'react';
import { render, screen } from '@testing-library/react';
import RepositoryCard from './RepositoryCard';

type TranslationKeys = 'repository.last_updated' | 'repository.view_on_github';
type Languages = 'ko' | 'en';
type TranslationsType = Record<Languages, Record<TranslationKeys, string>>;

const i18nextMock = {
  currentLanguage: 'ko' as Languages,

  translations: {
    ko: {
      'repository.last_updated': '마지막 업데이트',
      'repository.view_on_github': 'GitHub에서 보기',
    },
    en: {
      'repository.last_updated': 'Last updated',
      'repository.view_on_github': 'View on GitHub',
    },
  } as TranslationsType,

  t: function (key: TranslationKeys | string): string {
    return (
      this.translations[this.currentLanguage]?.[key as TranslationKeys] || key
    );
  },

  i18n: {
    get language() {
      return i18nextMock.currentLanguage;
    },
    changeLanguage: function (lang: Languages) {
      i18nextMock.currentLanguage = lang;
      return Promise.resolve();
    },
  },

  setLanguage: function (lang: Languages) {
    this.currentLanguage = lang;
  },
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => i18nextMock.t(key),
    i18n: i18nextMock.i18n,
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

describe('RepositoryCard 컴포넌트', () => {
  const mockRepository = {
    id: 123,
    name: 'test-repo',
    description: '테스트 저장소 설명입니다',
    stargazers_count: 42,
    updated_at: '2023-06-01T12:00:00Z',
    language: 'TypeScript',
    html_url: 'https://github.com/testuser/test-repo',
  };

  const username = 'testuser';

  beforeEach(() => {
    // Reset language to Korean before each test
    i18nextMock.setLanguage('ko');
  });

  it('저장소 정보가 올바르게 렌더링됩니다', () => {
    render(<RepositoryCard repository={mockRepository} username={username} />);

    expect(screen.getByText('test-repo')).toBeInTheDocument();

    expect(screen.getByText('테스트 저장소 설명입니다')).toBeInTheDocument();

    expect(screen.getByText('42')).toBeInTheDocument();

    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    expect(
      screen.getByText(/마지막 업데이트: Jun 1, 2023/)
    ).toBeInTheDocument();

    const githubLink = screen.getByText('GitHub에서 보기');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/testuser/test-repo'
    );
  });

  it('저장소 설명이 없을 경우에도 올바르게 렌더링됩니다', () => {
    const repoWithoutDescription = {
      ...mockRepository,
      description: null,
    };

    render(
      <RepositoryCard repository={repoWithoutDescription} username={username} />
    );

    expect(screen.getByText('test-repo')).toBeInTheDocument();

    expect(
      screen.queryByText('테스트 저장소 설명입니다')
    ).not.toBeInTheDocument();
  });

  it('언어가 없을 경우에도 올바르게 렌더링됩니다', () => {
    const repoWithoutLanguage = {
      ...mockRepository,
      language: null,
    };

    render(
      <RepositoryCard repository={repoWithoutLanguage} username={username} />
    );

    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('저장소 상세 페이지 링크가 올바르게 생성됩니다', () => {
    render(<RepositoryCard repository={mockRepository} username={username} />);

    const repoLink = screen.getByText('test-repo');
    expect(repoLink.closest('a')).toHaveAttribute(
      'href',
      '/testuser/test-repo'
    );
  });

  it('언어가 한글에서 영어로 변경될 때 올바르게 렌더링됩니다', () => {
    const { rerender } = render(
      <RepositoryCard repository={mockRepository} username={username} />
    );

    expect(
      screen.getByText(/마지막 업데이트: Jun 1, 2023/)
    ).toBeInTheDocument();
    expect(screen.getByText('GitHub에서 보기')).toBeInTheDocument();

    i18nextMock.setLanguage('en');

    rerender(
      <RepositoryCard repository={mockRepository} username={username} />
    );

    expect(screen.getByText(/Last updated: Jun 1, 2023/)).toBeInTheDocument();
    expect(screen.getByText('View on GitHub')).toBeInTheDocument();

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('테스트 저장소 설명입니다')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
