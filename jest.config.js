const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig는 next/jest가 비동기 Next.js 설정을 로드할 수 있도록 내보내기 방식으로 이 설정을 다음에 제공합니다
module.exports = createJestConfig(customJestConfig);
