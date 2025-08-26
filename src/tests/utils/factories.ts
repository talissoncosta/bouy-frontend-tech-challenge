import { UserData } from 'services/users/interface';

/**
 * Factory function to create mock user data
 */
export function createMockUser(overrides: Partial<UserData> = {}): UserData {
  const defaults: UserData = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe', 
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://example.com/avatar.jpg',
  };
  
  return { ...defaults, ...overrides };
}

/**
 * Factory function to create multiple mock users
 */
export function createMockUsersData(count: number = 3): UserData[] {
  return Array.from({ length: count }, (_, i) => 
    createMockUser({
      id: i + 1,
      firstName: `User${i + 1}`,
      lastName: `Last${i + 1}`,
      fullName: `User${i + 1} Last${i + 1}`,
      email: `user${i + 1}@example.com`,
    })
  );
}

/**
 * Create specific test users that match common test scenarios
 */
export function createTestUsers() {
  return {
    john: createMockUser({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'john.doe@example.com'
    }),
    jane: createMockUser({
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com'
    }),
    miles: createMockUser({
      id: 4,
      firstName: 'Miles',
      lastName: 'Cummerata',
      fullName: 'Miles Cummerata',
      email: 'miles.cummerata@example.com'
    })
  };
}

/**
 * Default props for UsersView component testing
 */
export function createMockUsersViewProps(overrides: any = {}) {
  const mockUsers = createMockUsersData(3);
  
  return {
    filteredData: mockUsers,
    isLoading: false,
    pageSize: 13,
    searchTerm: '',
    onSearchChange: jest.fn(),
    searchPlaceholder: 'Search users...',
    searchAriaLabel: 'Search users',
    onViewUser: jest.fn(),
    onEditUser: jest.fn(),
    ...overrides
  };
}
