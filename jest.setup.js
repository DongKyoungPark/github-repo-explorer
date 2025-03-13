import '@testing-library/jest-dom';

global.fetch = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});
