import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { TEST_MESSAGES } from './messages';

/**
 * Test wrapper with minimal providers needed for components
 */
export function createTestWrapper(options: {
  messages?: Record<string, string>;
  locale?: string;
  queryClient?: QueryClient;
} = {}) {
  const {
    messages = TEST_MESSAGES,
    locale = 'en',
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    })
  } = options;

  return function TestWrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(
        IntlProvider,
        { locale, messages },
        children
      )
    );
  };
}
