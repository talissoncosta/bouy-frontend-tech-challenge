// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock window.matchMedia for Ant Design components
const matchMediaMock = jest.fn().mockImplementation(query => {
  const listeners = [];
  return {
    matches: false,
    media: query || '',
    onchange: null,
    addListener: jest.fn((listener) => {
      if (listener) listeners.push(listener);
    }), // deprecated
    removeListener: jest.fn((listener) => {
      if (listener) {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      }
    }), // deprecated
    addEventListener: jest.fn((event, listener) => {
      if (listener) listeners.push(listener);
    }),
    removeEventListener: jest.fn((event, listener) => {
      if (listener) {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
      }
    }),
    dispatchEvent: jest.fn(),
  };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: matchMediaMock,
});

// Ensure window.matchMedia always returns a valid object
window.matchMedia = window.matchMedia || matchMediaMock;

// Mock ResizeObserver for Ant Design components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock getComputedStyle for JSDOM
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 120,
  height: 120,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: jest.fn()
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));
