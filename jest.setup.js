// Jest DOM 확장 기능 추가
import '@testing-library/jest-dom';

// 글로벌 fetch 모킹
global.fetch = jest.fn();

// 테스트 후 모킹 초기화
afterEach(() => {
  jest.resetAllMocks();
});
