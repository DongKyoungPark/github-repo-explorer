import React from 'react';
import { render } from '@testing-library/react';
import UserPage from './page';

jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ username: 'dongkyoungpark' }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('next/link', () => {
  return function MockLink({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  };
});

jest.mock('@/app/components/SkeletonLoader', () => {
  return function MockSkeletonLoader() {
    return <div data-testid="skeleton-loader">Loading...</div>;
  };
});

jest.mock('@/app/components/RepositoryCard', () => {
  return function MockRepositoryCard() {
    return <div>Repository Card</div>;
  };
});

jest.mock('react-infinite-scroll-component', () => {
  return function MockInfiniteScroll({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div>{children}</div>;
  };
});

global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => [],
});

describe('UserPage', () => {
  test('에러 없이 렌더링됩니다', () => {
    expect(() => {
      render(<UserPage />);
    }).not.toThrow();
  });
});
