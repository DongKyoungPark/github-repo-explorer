import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        app_title: '포리덤',
        'header.language': '언어',
        'header.light': '라이트 모드',
        'header.dark': '다크 모드',
      };
      return translations[key] || key;
    },
    i18n: {
      language: 'ko',
      changeLanguage: jest.fn(),
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

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('Header 컴포넌트', () => {
  beforeEach(() => {
    localStorage.clear();
    document.cookie = '';
    jest.clearAllMocks();
    document.documentElement.classList.remove('dark', 'light');
  });

  it('헤더가 올바르게 렌더링됩니다', () => {
    render(<Header />);

    expect(screen.getByText('포리덤')).toBeInTheDocument();

    expect(screen.getByText('언어')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '한국어' })).toBeInTheDocument();

    expect(screen.getByText('다크 모드')).toBeInTheDocument();
  });
});
