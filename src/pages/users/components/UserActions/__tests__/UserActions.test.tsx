import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { UserActions } from '../index';
import { createTestUsers, TEST_MESSAGES } from 'tests/utils';

// Test wrapper with IntlProvider
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <IntlProvider messages={TEST_MESSAGES} locale="en">
      {children}
    </IntlProvider>
  );
}

describe('UserActions', () => {
  const testUsers = createTestUsers();
  const mockOnViewUser = jest.fn();
  const mockOnEditUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders both action buttons', () => {
    render(
      <TestWrapper>
        <UserActions
          onViewUser={mockOnViewUser}
          onEditUser={mockOnEditUser}
        />
      </TestWrapper>
    );

    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('calls onViewUser when view button is clicked', () => {
    render(
      <TestWrapper>
        <UserActions
          onViewUser={mockOnViewUser}
          onEditUser={mockOnEditUser}
        />
      </TestWrapper>
    );

    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);

    expect(mockOnViewUser).toHaveBeenCalled();
  });

  test('calls onEditUser when edit button is clicked', () => {
    render(
      <TestWrapper>
        <UserActions
          onViewUser={mockOnViewUser}
          onEditUser={mockOnEditUser}
        />
      </TestWrapper>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockOnEditUser).toHaveBeenCalled();
  });
});
