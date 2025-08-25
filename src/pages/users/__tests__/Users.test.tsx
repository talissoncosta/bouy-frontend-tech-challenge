import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Users } from '../index';

// Mock the useUsers hook
const mockUsersData = {
  list: [
    { id: 1, firstName: 'John', lastName: 'Doe', fullName: 'John Doe', email: 'john.doe@example.com', image: 'https://example.com/john.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', fullName: 'Jane Smith', email: 'jane.smith@example.com', image: 'https://example.com/jane.jpg' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', fullName: 'Bob Johnson', email: 'bob.johnson@example.com', image: 'https://example.com/bob.jpg' },
    { id: 4, firstName: 'Miles', lastName: 'Cummerata', fullName: 'Miles Cummerata', email: 'miles.cummerata@example.com', image: 'https://example.com/miles.jpg' },
    // Generate more test data to reach 26 users for pagination testing
    ...Array.from({ length: 22 }, (_, i) => ({
      id: i + 5,
      firstName: `User${i + 5}`,
      lastName: `LastName${i + 5}`,
      fullName: `User${i + 5} LastName${i + 5}`,
      email: `user${i + 5}@example.com`,
      image: `https://example.com/user${i + 5}.jpg`
    }))
  ]
};

jest.mock('hooks', () => ({
  useUsers: () => ({
    data: mockUsersData,
    isLoading: false
  }),
  useDebounce: (value: string) => value // Immediate return for testing
}));

// Helper function to render component with providers
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('Users Page - Acceptance Criteria Tests', () => {

  describe('Page Structure and Initial Load', () => {
    test('renders Users page with title', () => {
      renderWithProviders(<Users />);
      expect(screen.getByText('Users Management')).toBeInTheDocument();
    });

    test('renders search input field', () => {
      renderWithProviders(<Users />);
      expect(screen.getByPlaceholderText('Search by name or email')).toBeInTheDocument();
    });

    test('renders table with correct columns', () => {
      renderWithProviders(<Users />);
      
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('First name')).toBeInTheDocument();
      expect(screen.getByText('Last name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });

  describe('Acceptance Criteria: Table loads with 13 elements', () => {
    test('displays exactly 13 rows on first page', async () => {
      renderWithProviders(<Users />);
      
      await waitFor(() => {
        // Check that pagination shows "1-13 of 26 users"
        expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
      });

      // Count visible table rows (excluding header)
      const tableRows = screen.getAllByRole('row');
      // Should be 14 rows total: 1 header + 13 data rows
      expect(tableRows).toHaveLength(14);
    });
  });

  describe('Acceptance Criteria: Page 2 shows 13 different rows', () => {
    test('pagination to page 2 shows different users', async () => {
      renderWithProviders(<Users />);
      
      await waitFor(() => {
        expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
      });

      // Get first page data
      const firstPageFirstUser = screen.getByText('John Doe');
      expect(firstPageFirstUser).toBeInTheDocument();

      // Click to go to page 2
      const page2Button = screen.getByTitle('2');
      await userEvent.click(page2Button);

      await waitFor(() => {
        // Should show "14-26 of 26 users" on page 2
        expect(screen.getByText('14-26 of 26 users')).toBeInTheDocument();
      });

      // First page user should no longer be visible
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      
      // Should show different users on page 2
      expect(screen.getByText('User17 LastName17')).toBeInTheDocument();
    });
  });

  describe('Acceptance Criteria: Email column sorting', () => {
    test('clicking Email column header sorts data ASC/DESC', async () => {
      renderWithProviders(<Users />);
      
      await waitFor(() => {
        expect(screen.getByText('Email')).toBeInTheDocument();
      });

      const emailHeader = screen.getByText('Email');
      
      // Click to sort ascending
      await userEvent.click(emailHeader);
      
      await waitFor(() => {
        const tableRows = screen.getAllByRole('row');
        // First data row should have the lowest email alphabetically
        expect(tableRows[1]).toHaveTextContent('bob.johnson@example.com');
      });

      // Click again to sort descending  
      await userEvent.click(emailHeader);
      
      await waitFor(() => {
        const tableRows = screen.getAllByRole('row');
        // First data row should have the highest email alphabetically
        expect(tableRows[1]).toHaveTextContent('user9@example.com');
      });
    });
  });

  describe('Acceptance Criteria: Search filtering functionality', () => {
    test('searching "Miles" shows only user with ID=4', async () => {
      renderWithProviders(<Users />);
      
      const searchInput = screen.getByPlaceholderText('Search by name or email');
      
      // Type "Miles" in search
      await userEvent.type(searchInput, 'Miles');
      
      await waitFor(() => {
        // Should only show Miles Cummerata (ID=4)
        expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
        expect(screen.getByText('miles.cummerata@example.com')).toBeInTheDocument();
        
        // Other users should not be visible
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        
        // Pagination should show "1-1 of 1 users"
        expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
      });
    });

    test('searching "Cummerata" shows only user with ID=4', async () => {
      renderWithProviders(<Users />);
      
      const searchInput = screen.getByPlaceholderText('Search by name or email');
      
      // Type "Cummerata" in search  
      await userEvent.type(searchInput, 'Cummerata');
      
      await waitFor(() => {
        // Should only show Miles Cummerata (ID=4)
        expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
        expect(screen.getByText('miles.cummerata@example.com')).toBeInTheDocument();
        
        // Other users should not be visible
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
        
        // Pagination should show "1-1 of 1 users"  
        expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
      });
    });

    test('clearing search filter returns table to original state', async () => {
      renderWithProviders(<Users />);
      
      const searchInput = screen.getByPlaceholderText('Search by name or email');
      
      // First, filter by "Miles"
      await userEvent.type(searchInput, 'Miles');
      
      await waitFor(() => {
        expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
      });
      
      // Clear the search using the clear button
      const clearButton = screen.getByRole('button', { name: /clear/i });
      await userEvent.click(clearButton);
      
      await waitFor(() => {
        // Should return to original state with all 26 users
        expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
        
        // Original users should be visible again
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
      });
    });

    test('search works across multiple fields (firstName, lastName, email, fullName)', async () => {
      renderWithProviders(<Users />);
      
      const searchInput = screen.getByPlaceholderText('Search by name or email');
      
      // Search by email domain
      await userEvent.type(searchInput, 'john.doe@example.com');
      
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
      });
      
      // Clear and search by first name
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Jane');
      
      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
      });
    });
  });

  describe('User Interface Elements', () => {
    test('displays user avatars with fallback initials', async () => {
      renderWithProviders(<Users />);
      
      await waitFor(() => {
        // Check that avatars are rendered (they should have alt text)
        expect(screen.getByAltText('John Doe')).toBeInTheDocument();
        expect(screen.getByAltText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByAltText('Miles Cummerata')).toBeInTheDocument();
      });
    });

    test('displays View and Edit action buttons', async () => {
      renderWithProviders(<Users />);
      
      await waitFor(() => {
        const viewButtons = screen.getAllByText('View');
        const editButtons = screen.getAllByText('Edit');
        
        // Should have 13 View and 13 Edit buttons (one for each row on page 1)
        expect(viewButtons).toHaveLength(13);
        expect(editButtons).toHaveLength(13);
      });
    });
  });

  describe('Loading States', () => {
    test('shows loading state when data is being fetched', () => {
      // Mock loading state
      jest.doMock('hooks', () => ({
        useUsers: () => ({
          data: undefined,
          isLoading: true
        }),
        useDebounce: (value: string) => value
      }));

      const { Users: LoadingUsers } = require('../index');
      renderWithProviders(<LoadingUsers />);
      
      // Should show loading spinner (Ant Design Table loading state)
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });
  });
});

describe('Users Page - Edge Cases', () => {
  test('handles empty search results gracefully', async () => {
    renderWithProviders(<Users />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    
    // Search for something that won't match any users
    await userEvent.type(searchInput, 'NonExistentUser');
    
    await waitFor(() => {
      // Should show "No data" message from Ant Design Table
      expect(screen.getByText('No data')).toBeInTheDocument();
    });
  });

  test('search is case insensitive', async () => {
    renderWithProviders(<Users />);
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    
    // Search with different case
    await userEvent.type(searchInput, 'MILES');
    
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });
    
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'cummerata');
    
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });
  });
});