import '@testing-library/jest-dom';

// Mock matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver for components that use it
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock rc-motion to prevent animation timeouts
jest.mock('rc-motion', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, visible }: { children: React.ReactNode; visible?: boolean }) => {
      if (visible === false) return null;
      return React.createElement('div', {}, children);
    },
  };
});

// Mock rc-util/lib/Portal to prevent portal rendering issues
jest.mock('rc-util/lib/Portal', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return React.createElement('div', { 'data-testid': 'portal' }, children);
    },
  };
});

// Mock Ant Design's responsive observer
jest.mock('antd/lib/_util/responsiveObserver', () => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  register: jest.fn(),
}));

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// Mock window.getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn().mockReturnValue({
    getPropertyValue: jest.fn().mockReturnValue(''),
  }),
});

// Mock getScrollBarSize to prevent errors
jest.mock('rc-util/lib/getScrollBarSize', () => ({
  getTargetScrollBarSize: jest.fn().mockReturnValue({ width: 0, height: 0 }),
}));

// Suppress console warnings for known issues
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
       args[0].includes('Warning: useLayoutEffect does nothing on the server'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
