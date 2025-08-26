import { renderHook, act } from '@testing-library/react';
import { useUserSearch } from '../useUserSearch';
import { createTestUsers, createMockUsersData } from 'tests/utils';

// Mock the useDebounce hook
jest.mock('hooks', () => ({
  useDebounce: (value: string) => value // Immediate return for testing
}));

describe('useUserSearch', () => {
  const testUsers = [
    ...Object.values(createTestUsers()),
    ...createMockUsersData(5)
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    test('returns correct initial values', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      expect(result.current.searchTerm).toBe('');
      expect(result.current.filteredData).toEqual(testUsers);
      expect(typeof result.current.setSearchTerm).toBe('function');
    });

    test('handles undefined data gracefully', () => {
      const { result } = renderHook(() => useUserSearch(undefined));

      expect(result.current.searchTerm).toBe('');
      expect(result.current.filteredData).toEqual([]);
    });

    test('handles empty data array', () => {
      const { result } = renderHook(() => useUserSearch([]));

      expect(result.current.searchTerm).toBe('');
      expect(result.current.filteredData).toEqual([]);
    });
  });

  describe('Search Functionality', () => {
    test('updates search term', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('john');
      });

      expect(result.current.searchTerm).toBe('john');
    });

    test('filters users by first name', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('John');
      });

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0].firstName).toBe('John');
    });

    test('filters users by last name', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('Cummerata');
      });

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0].lastName).toBe('Cummerata');
    });

    test('filters users by email', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('jane.smith');
      });

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0].email).toContain('jane.smith');
    });

    test('filters users by full name', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('Miles Cummerata');
      });

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0].fullName).toBe('Miles Cummerata');
    });

    test('search is case insensitive', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('MILES');
      });

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0].firstName).toBe('Miles');
    });

    test('returns all users when search term is empty', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      // First set a search term
      act(() => {
        result.current.setSearchTerm('Miles');
      });

      expect(result.current.filteredData).toHaveLength(1);

      // Clear the search
      act(() => {
        result.current.setSearchTerm('');
      });

      expect(result.current.filteredData).toHaveLength(testUsers.length);
    });

    test('returns empty array for non-matching search', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('NonExistentUser');
      });

      expect(result.current.filteredData).toHaveLength(0);
    });

    test('handles partial matches', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('Jo');
      });

      // Should match both "John" and "User1", "User2", etc.
      expect(result.current.filteredData.length).toBeGreaterThan(0);
      expect(result.current.filteredData.some(user => 
        user.firstName.includes('Jo') || 
        user.lastName.includes('Jo') ||
        user.email.includes('Jo') ||
        user.fullName.includes('Jo')
      )).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    test('handles special characters in search', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('john.doe@example.com');
      });

      expect(result.current.filteredData).toHaveLength(1);
      expect(result.current.filteredData[0].email).toBe('john.doe@example.com');
    });

    test('handles whitespace in search', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));

      act(() => {
        result.current.setSearchTerm('  John  ');
      });

      // The hook doesn't trim whitespace, so "  John  " won't match "John"
      // because "john".includes("  john  ") is false
      expect(result.current.filteredData).toHaveLength(0);
    });

    test('handles very long search terms', () => {
      const { result } = renderHook(() => useUserSearch(testUsers));
      const longSearchTerm = 'a'.repeat(1000);

      act(() => {
        result.current.setSearchTerm(longSearchTerm);
      });

      expect(result.current.filteredData).toHaveLength(0);
    });
  });

  describe('Performance', () => {
    test('filters large datasets efficiently', () => {
      const largeDataset = createMockUsersData(1000);
      const { result } = renderHook(() => useUserSearch(largeDataset));

      act(() => {
        result.current.setSearchTerm('User1');
      });

      // Should still work with large datasets
      expect(result.current.filteredData.length).toBeGreaterThan(0);
    });
  });
});
