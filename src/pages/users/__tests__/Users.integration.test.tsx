import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Users } from '../index';

// Mock the services to return actual test data that matches acceptance criteria
const mockUsersData = {
  list: [
    { id: 1, firstName: 'John', lastName: 'Doe', fullName: 'John Doe', email: 'a.john@example.com', image: 'https://example.com/john.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', fullName: 'Jane Smith', email: 'b.jane@example.com', image: 'https://example.com/jane.jpg' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', fullName: 'Bob Johnson', email: 'c.bob@example.com', image: 'https://example.com/bob.jpg' },
    { id: 4, firstName: 'Miles', lastName: 'Cummerata', fullName: 'Miles Cummerata', email: 'd.miles@example.com', image: 'https://example.com/miles.jpg' },
    ...Array.from({ length: 22 }, (_, i) => ({
      id: i + 5,
      firstName: `User${i + 5}`,
      lastName: `LastName${i + 5}`,
      fullName: `User${i + 5} LastName${i + 5}`,
      email: `z.user${i + 5}@example.com`, // Start with 'z' to test sorting
      image: `https://example.com/user${i + 5}.jpg`
    }))
  ]
};

jest.mock('hooks', () => ({
  useUsers: () => ({
    data: mockUsersData,
    isLoading: false
  }),
  useDebounce: (value: string) => value
}));

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
};

describe('Users Page - Integration Tests (Acceptance Criteria)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('AC1: Users section loads table with 13 elements', async () => {
    renderComponent();
    
    // Wait for table to load
    await waitFor(() => {
      expect(screen.getByText('Users Management')).toBeInTheDocument();
    });

    // Check pagination shows correct count
    await waitFor(() => {
      expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
    });

    // Verify we have exactly 13 data rows + 1 header = 14 total rows
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(14);
  });

  test('AC2: Page 2 displays 13 different rows', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
    });

    // Remember first page content
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Navigate to page 2
    const page2 = screen.getByTitle('2');
    await userEvent.click(page2);

    // Check page 2 content
    await waitFor(() => {
      expect(screen.getByText('14-26 of 26 users')).toBeInTheDocument();
    });

    // First page users should be gone
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    // Should show users from second page
    expect(screen.getByText('User17 LastName17')).toBeInTheDocument();
  });

  test('AC3: Email column sorting works ASC/DESC', async () => {
    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    // Click email header to sort
    const emailHeader = screen.getByText('Email');
    await userEvent.click(emailHeader);

    // Should sort alphabetically (a.john@example.com should be first)
    await waitFor(() => {
      const firstRowEmail = screen.getAllByRole('row')[1]; 
      expect(firstRowEmail).toHaveTextContent('a.john@example.com');
    });

    // Click again for descending sort
    await userEvent.click(emailHeader);

    // Should reverse sort (z.user26@example.com should be first)
    await waitFor(() => {
      const firstRowEmail = screen.getAllByRole('row')[1];
      expect(firstRowEmail).toHaveTextContent('z.user26@example.com');
    });
  });

  test('AC4: Search "Miles" shows only user with ID=4', async () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    await userEvent.type(searchInput, 'Miles');
    
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });

    // Should show only 1 result
    await waitFor(() => {
      expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
    });

    // Other users should not be visible
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('AC5: Search "Cummerata" shows only user with ID=4', async () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    await userEvent.type(searchInput, 'Cummerata');
    
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });

    // Should show only 1 result  
    await waitFor(() => {
      expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
    });

    // Other users should not be visible
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  test('AC6: Clearing search returns table to original state', async () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    
    // Filter first
    await userEvent.type(searchInput, 'Miles');
    await waitFor(() => {
      expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
    });
    
    // Clear search
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);
    
    // Should return to original state
    await waitFor(() => {
      expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
    });

    // All original users should be back
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
  });

  test('Search is case-insensitive and works across all fields', async () => {
    renderComponent();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    
    // Test case insensitive search
    await userEvent.type(searchInput, 'MILES');
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });

    // Clear and test email search
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'd.miles@example.com');
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });
  });
});