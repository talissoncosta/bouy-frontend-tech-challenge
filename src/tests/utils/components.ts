import React from 'react';

/**
 * Mock layout component for testing (avoids complex layout dependencies)
 */
export function MockLayout({ children }: { children: React.ReactNode }) {
  return React.createElement('div', { 'data-testid': 'mock-layout' }, children);
}
