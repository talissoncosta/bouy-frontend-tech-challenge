/**
 * Acceptance Criteria Tests for Users Page
 * 
 * These tests validate the exact requirements from README.md:
 * 1. Users section loads table with 13 elements
 * 2. Page 2 displays 13 different rows  
 * 3. Email column sorting ASC/DESC
 * 4. Search "Miles" shows user ID=4
 * 5. Search "Cummerata" shows user ID=4
 * 6. Clearing search returns to original state
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Users } from '../index';

// Test data that matches the exact acceptance criteria
const testData = {
  list: [
    // First 13 users (page 1)
    { id: 1, firstName: 'Alice', lastName: 'Johnson', fullName: 'Alice Johnson', email: 'alice@example.com', image: '' },
    { id: 2, firstName: 'Bob', lastName: 'Williams', fullName: 'Bob Williams', email: 'bob@example.com', image: '' },
    { id: 3, firstName: 'Carol', lastName: 'Brown', fullName: 'Carol Brown', email: 'carol@example.com', image: '' },
    { id: 4, firstName: 'Miles', lastName: 'Cummerata', fullName: 'Miles Cummerata', email: 'miles@example.com', image: '' },
    { id: 5, firstName: 'David', lastName: 'Davis', fullName: 'David Davis', email: 'david@example.com', image: '' },
    { id: 6, firstName: 'Eve', lastName: 'Miller', fullName: 'Eve Miller', email: 'eve@example.com', image: '' },
    { id: 7, firstName: 'Frank', lastName: 'Wilson', fullName: 'Frank Wilson', email: 'frank@example.com', image: '' },
    { id: 8, firstName: 'Grace', lastName: 'Moore', fullName: 'Grace Moore', email: 'grace@example.com', image: '' },
    { id: 9, firstName: 'Henry', lastName: 'Taylor', fullName: 'Henry Taylor', email: 'henry@example.com', image: '' },
    { id: 10, firstName: 'Iris', lastName: 'Anderson', fullName: 'Iris Anderson', email: 'iris@example.com', image: '' },
    { id: 11, firstName: 'Jack', lastName: 'Thomas', fullName: 'Jack Thomas', email: 'jack@example.com', image: '' },
    { id: 12, firstName: 'Kate', lastName: 'Jackson', fullName: 'Kate Jackson', email: 'kate@example.com', image: '' },
    { id: 13, firstName: 'Leo', lastName: 'White', fullName: 'Leo White', email: 'leo@example.com', image: '' },
    
    // Second 13 users (page 2) 
    { id: 14, firstName: 'Mia', lastName: 'Harris', fullName: 'Mia Harris', email: 'mia@example.com', image: '' },
    { id: 15, firstName: 'Noah', lastName: 'Martin', fullName: 'Noah Martin', email: 'noah@example.com', image: '' },
    { id: 16, firstName: 'Olivia', lastName: 'Garcia', fullName: 'Olivia Garcia', email: 'olivia@example.com', image: '' },
    { id: 17, firstName: 'Paul', lastName: 'Robinson', fullName: 'Paul Robinson', email: 'paul@example.com', image: '' },
    { id: 18, firstName: 'Quinn', lastName: 'Clark', fullName: 'Quinn Clark', email: 'quinn@example.com', image: '' },
    { id: 19, firstName: 'Ruby', lastName: 'Rodriguez', fullName: 'Ruby Rodriguez', email: 'ruby@example.com', image: '' },
    { id: 20, firstName: 'Sam', lastName: 'Lewis', fullName: 'Sam Lewis', email: 'sam@example.com', image: '' },
    { id: 21, firstName: 'Tina', lastName: 'Lee', fullName: 'Tina Lee', email: 'tina@example.com', image: '' },
    { id: 22, firstName: 'Uma', lastName: 'Walker', fullName: 'Uma Walker', email: 'uma@example.com', image: '' },
    { id: 23, firstName: 'Victor', lastName: 'Hall', fullName: 'Victor Hall', email: 'victor@example.com', image: '' },
    { id: 24, firstName: 'Wendy', lastName: 'Allen', fullName: 'Wendy Allen', email: 'wendy@example.com', image: '' },
    { id: 25, firstName: 'Xander', lastName: 'Young', fullName: 'Xander Young', email: 'xander@example.com', image: '' },
    { id: 26, firstName: 'Yara', lastName: 'King', fullName: 'Yara King', email: 'yara@example.com', image: '' }
  ]
};

jest.mock('hooks', () => ({
  useUsers: () => ({
    data: testData,
    isLoading: false
  }),
  useDebounce: (value: string) => value
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('Users Page - README Acceptance Criteria', () => {
  const renderUsers = () => render(<Users />, { wrapper: TestWrapper });

  test('AC1: Table loads with 13 elements on first page', async () => {
    renderUsers();
    
    await waitFor(() => {
      expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
    });

    // Count data rows (all rows minus header row)
    const allRows = screen.getAllByRole('row');
    expect(allRows).toHaveLength(14); // 1 header + 13 data
  });

  test('AC2: Page 2 displays 13 different rows', async () => {
    renderUsers();
    
    // Wait for page 1 to load
    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    // Navigate to page 2
    await userEvent.click(screen.getByTitle('2'));
    
    // Verify page 2 content
    await waitFor(() => {
      expect(screen.getByText('14-26 of 26 users')).toBeInTheDocument();
      expect(screen.getByText('Mia Harris')).toBeInTheDocument();
    });

    // Page 1 users should not be visible
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  test('AC3: Email column sorting changes order ASC/DESC', async () => {
    renderUsers();
    
    // Click Email header to sort ascending
    await userEvent.click(screen.getByText('Email'));
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('alice@example.com');
    });

    // Click again to sort descending
    await userEvent.click(screen.getByText('Email'));
    
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('yara@example.com');
    });
  });

  test('AC4: Writing "Miles" in search shows ONE row with ID=4', async () => {
    renderUsers();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    await userEvent.type(searchInput, 'Miles');
    
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
      expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
    });

    // Only Miles should be visible
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  test('AC5: Writing "Cummerata" in search shows ONE row with ID=4', async () => {
    renderUsers();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    await userEvent.type(searchInput, 'Cummerata');
    
    await waitFor(() => {
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
      expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
    });

    // Only Miles should be visible
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  test('AC6: Clearing search returns table to original state', async () => {
    renderUsers();
    
    const searchInput = screen.getByPlaceholderText('Search by name or email');
    
    // Search first
    await userEvent.type(searchInput, 'Miles');
    await waitFor(() => {
      expect(screen.getByText('1-1 of 1 users')).toBeInTheDocument();
    });
    
    // Clear search
    await userEvent.clear(searchInput);
    
    // Should return to original 26 users
    await waitFor(() => {
      expect(screen.getByText('1-13 of 26 users')).toBeInTheDocument();
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Miles Cummerata')).toBeInTheDocument();
    });
  });
});