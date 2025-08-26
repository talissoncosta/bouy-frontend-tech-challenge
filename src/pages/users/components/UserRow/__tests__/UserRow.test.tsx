import { render, screen } from '@testing-library/react';
import { UserRow } from '../index';
import { UserData } from 'services/users/interface';

const mockUser: UserData = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://example.com/avatar.jpg'
};

describe('UserRow', () => {
  test('renders user information correctly', () => {
    render(<UserRow user={mockUser} />);
    
    expect(screen.getByLabelText('User: John Doe')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar for John Doe')).toBeInTheDocument();
  });

  test('renders loading state correctly', () => {
    render(<UserRow user={mockUser} isLoading={true} />);
    
    const userRow = screen.getByLabelText('User: John Doe');
    expect(userRow).toBeInTheDocument();
    
    // When loading, the user name text should be empty/hidden
    const nameContainer = userRow.querySelector('.userNameLoading');
    expect(nameContainer).toBeInTheDocument();
  });

  test('renders normal state when not loading', () => {
    render(<UserRow user={mockUser} isLoading={false} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<UserRow user={mockUser} />);
    
    const userRow = screen.getByLabelText('User: John Doe');
    expect(userRow).toHaveAttribute('aria-label', 'User: John Doe');
  });

  test('renders different user names correctly', () => {
    const differentUser: UserData = {
      ...mockUser,
      firstName: 'Alice',
      lastName: 'Smith',
      fullName: 'Alice Smith'
    };

    render(<UserRow user={differentUser} />);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByLabelText('User: Alice Smith')).toBeInTheDocument();
  });
});