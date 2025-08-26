import { renderHook, act } from '@testing-library/react';
import { useUserActions } from '../useUserActions';
import { createTestUsers } from 'tests/utils';

describe('useUserActions', () => {
  const testUsers = createTestUsers();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns correct initial values', () => {
    const { result } = renderHook(() => useUserActions());

    expect(typeof result.current.handleViewUser).toBe('function');
    expect(typeof result.current.handleEditUser).toBe('function');
  });

  test('handleViewUser logs user data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useUserActions());

    const testUser = testUsers.john;

    act(() => {
      result.current.handleViewUser(testUser);
    });

    expect(consoleSpy).toHaveBeenCalledWith('View user:', testUser);
    
    consoleSpy.mockRestore();
  });

  test('handleEditUser logs user data', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useUserActions());

    const testUser = testUsers.jane;

    act(() => {
      result.current.handleEditUser(testUser);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Edit user:', testUser);
    
    consoleSpy.mockRestore();
  });
});
