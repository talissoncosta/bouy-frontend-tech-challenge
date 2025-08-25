import { UserData } from "./interface";

export const mockUsers: UserData[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    image: 'https://picsum.photos/id/2/200/300',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    fullName: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    image: 'https://picsum.photos/id/3/200/300',
  },
  {
    id: 4,
    firstName: 'Miles',
    lastName: 'Cummerata',
    fullName: 'Miles Cummerata',
    email: 'miles.cummerata@example.com',
    image: 'https://picsum.photos/id/4/200/300',
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    fullName: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    image: 'https://picsum.photos/id/5/200/300',
  }
];

export const createMockUser = (overrides: Partial<UserData> = {}): UserData => {
  const baseUser = {
    id: Math.floor(Math.random() * 1000),
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    email: 'test.user@example.com',
    image: 'https://picsum.photos/id/999/200/300',
  };
  
  // Ensure ID is always a number and fullName is constructed if needed
  const finalOverrides = { ...overrides };
  if (finalOverrides.id !== undefined) {
    finalOverrides.id = Number(finalOverrides.id);
  }

  const result = { ...baseUser, ...finalOverrides };
  
  // If firstName or lastName is provided but fullName isn't, construct it
  if ((finalOverrides.firstName || finalOverrides.lastName) && !finalOverrides.fullName) {
    result.fullName = `${result.firstName} ${result.lastName}`.trim();
  }
  
  return result;
};

export const createMockUsers = (count: number, baseData?: Partial<UserData>): UserData[] => {
  return Array.from({ length: count }, (_, index) => 
    createMockUser({
      id: index + 1,
      firstName: `User${index + 1}`,
      lastName: `LastName${index + 1}`,
      fullName: `User${index + 1} LastName${index + 1}`,
      email: `user${index + 1}@example.com`,
      ...baseData,
    })
  );
};

// Helper to find users for acceptance criteria testing
export const findMilesUser = (users: UserData[]): UserData | undefined => {
  return users.find(user => user.firstName.toLowerCase() === 'miles');
};

export const findCummerataUser = (users: UserData[]): UserData | undefined => {
  return users.find(user => user.lastName.toLowerCase() === 'cummerata');
};

export const searchUsers = (users: UserData[], query: string): UserData[] => {
  if (!query) return users;
  
  const lowerQuery = query.toLowerCase();
  return users.filter(user => 
    user.firstName.toLowerCase().includes(lowerQuery) ||
    user.lastName.toLowerCase().includes(lowerQuery) ||
    user.fullName.toLowerCase().includes(lowerQuery) ||
    user.email.toLowerCase().includes(lowerQuery)
  );
};

export const findUserById = (users: UserData[], id: number | string): UserData | undefined => {
  return users.find(user => user.id === id);
};

export const updateUser = (users: UserData[], id: number | string, updates: Partial<UserData>): UserData[] => {
  return users.map(user => {
    if (user.id === id) {
      const updatedUser = { ...user, ...updates };
      // Ensure fullName is updated if firstName or lastName changes
      if (updates.firstName || updates.lastName) {
        updatedUser.fullName = `${updatedUser.firstName} ${updatedUser.lastName}`.trim();
      }
      return updatedUser;
    }
    return user;
  });
};

// Test data for edge cases
export const edgeCaseUsers: UserData[] = [
  {
    id: 999,
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    image: '',
  },
  {
    id: 1000,
    firstName: 'VeryLongFirstNameThatExceedsNormalLength',
    lastName: 'VeryLongLastNameThatExceedsNormalLength',
    fullName: 'VeryLongFirstNameThatExceedsNormalLength VeryLongLastNameThatExceedsNormalLength',
    email: 'very.long.email.address.that.exceeds.normal.length@very.long.domain.name.com',
    image: 'https://very-long-url-that-exceeds-normal-length.com/very-long-path/very-long-filename.jpg',
  },
  {
    id: 1001,
    firstName: 'Special@#$%^&*()',
    lastName: 'Characters!@#$%^&*()',
    fullName: 'Special@#$%^&*() Characters!@#$%^&*()',
    email: 'special.chars@example.com',
    image: 'https://example.com/image.jpg',
  }
];

// Helper to reset mock data between tests
export const resetMockData = () => {
  // This could be used to reset any global mock state if needed
  // For now, it's a placeholder for future use
};
