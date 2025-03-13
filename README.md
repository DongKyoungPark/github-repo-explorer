# GitHub Repository Explorer

### 자유롭게 GitHub 저장소를 탐색하는 웹 애플리케이션

## 프로젝트 개요

GitHub 사용자 이름을 입력하여 해당 사용자의 저장소를 검색하고 탐색할 수 있는 웹 애플리케이션입니다. 사용자 이름을 입력하면 해당 사용자의 모든 저장소 목록을 조회하고, 다양한 필터링 및 정렬 옵션을 통해 효율적으로 저장소를 찾을 수 있습니다.

### 주요 기능

- GitHub 사용자 이름으로 저장소 검색
- 저장소 목록 무한 스크롤 지원
- 프로그래밍 언어별 필터링 (JavaScript, TypeScript, Python 등)
- 저장소 정렬 기능 (최근 업데이트, 스타 수)
- 다국어 지원 (i18n)
- 반응형 디자인
- 다크 모드 지원

## 기술 스택

### 프론트엔드

- **React 19**: 최신 React 버전을 사용한 컴포넌트 기반 UI 개발
- **Next.js 15**: 서버 사이드 렌더링 및 정적 사이트 생성을 위한 프레임워크
- **TypeScript**: 타입 안정성을 보장하는 JavaScript 확장
- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크

### 개발 도구

- **Turbopack**: 빠른 개발 환경을 위한 Next.js 번들러
- **ESLint**: 코드 품질 및 일관성 유지
- **Jest**: 자바스크립트 테스트 프레임워크
- **Testing Library**: 컴포넌트 테스트를 위한 라이브러리
- **Storybook**: UI 컴포넌트 개발 및 문서화 도구

### 기타 라이브러리

- **react-infinite-scroll-component**: 무한 스크롤 구현
- **next-i18next**: 다국어 지원
- **i18next**: 국제화 프레임워크

## 설치 방법

이 프로젝트를 로컬 환경에서 실행하기 위한 단계별 가이드입니다.

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn 패키지 매니저

### 설치 단계

1. 의존성 설치:

```bash
npm install
# 또는
yarn install
```

## 실행 방법

### 개발 모드로 실행

Turbopack을 활용한 빠른 개발 서버를 실행합니다:

```bash
npm run dev
# 또는
yarn dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션에 접근할 수 있습니다.

### 프로덕션 빌드

프로덕션용 빌드를 생성합니다:

```bash
npm run build
# 또는
yarn build
```

빌드된 애플리케이션을 실행합니다:

```bash
npm run start
# 또는
yarn start
```

### 테스트 실행

단위 테스트를 실행합니다:

```bash
npm run test
# 또는
yarn test
```

테스트를 지속적으로 모니터링하려면:

```bash
npm run test:watch
# 또는
yarn test:watch
```

### Storybook 실행

UI 컴포넌트를 탐색하고 문서화하기 위한 Storybook을 실행합니다:

```bash
npm run storybook
# 또는
yarn storybook
```

## 프로젝트 구조

```
foreedom/
├── app/                  # Next.js 애플리케이션 폴더
│   ├── components/       # 공통 컴포넌트
│   │   ├── Header.tsx    # 앱 헤더 컴포넌트
│   │   ├── RepositoryCard.tsx # 저장소 카드 컴포넌트
│   │   └── SkeletonLoader.tsx # 로딩 스켈레톤 컴포넌트
│   ├── [username]/       # 사용자 페이지 (동적 라우팅)
│   │   └── [repo]/       # 저장소 상세 페이지 (동적 라우팅)
│   ├── i18n.ts           # i18n 설정
│   ├── i18n-config.ts    # i18n 구성
│   ├── globals.css       # 전역 스타일
│   ├── TranslationsProvider.tsx # 번역 제공자 컴포넌트
│   ├── layout.tsx        # 앱 레이아웃
│   └── page.tsx          # 메인 페이지
├── public/               # 정적 에셋
├── .storybook/           # Storybook 설정
├── stories/              # Storybook 컴포넌트 스토리
├── tailwind.config.js    # Tailwind CSS 설정
├── next.config.js        # Next.js 설정
├── next-i18next.config.js # i18n 설정
├── tsconfig.json         # TypeScript 설정
└── package.json          # 프로젝트 의존성 및 스크립트
```

## 배포 URL

https://github-repo-explorer-nu.vercel.app/
