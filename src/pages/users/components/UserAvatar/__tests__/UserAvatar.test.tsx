import { render, screen, waitFor } from '@testing-library/react';
import { UserAvatar } from '../index';
import { UserData } from 'services/users/interface';

const mockUser: UserData = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://example.com/avatar.jpg'
};

const mockUserWithoutImage: UserData = {
  ...mockUser,
  image: ''
};

describe('UserAvatar', () => {
  test('renders with initials when no image provided', () => {
    render(<UserAvatar user={mockUserWithoutImage} />);
    
    expect(screen.getByLabelText('Avatar for John Doe')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  test('renders with custom size', () => {
    render(<UserAvatar user={mockUser} size={60} />);
    
    const avatar = screen.getByLabelText('Avatar for John Doe');
    expect(avatar).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    const customClass = 'custom-avatar';
    render(<UserAvatar user={mockUser} className={customClass} />);
    
    const container = screen.getByLabelText('Avatar for John Doe');
    expect(container).toHaveClass(customClass);
  });

  test('shows initials correctly for different names', () => {
    const userWithDifferentName: UserData = {
      ...mockUser,
      firstName: 'Alice',
      lastName: 'Smith',
      fullName: 'Alice Smith',
      image: ''
    };

    render(<UserAvatar user={userWithDifferentName} />);
    expect(screen.getByText('AS')).toBeInTheDocument();
  });

  test('handles image loading states', async () => {
    render(<UserAvatar user={mockUser} />);
    
    // Initially should show initials while loading
    expect(screen.getByText('JD')).toBeInTheDocument();
    
    // After image loads (simulated), avatar should still be accessible
    const avatar = screen.getByLabelText('Avatar for John Doe');
    expect(avatar).toBeInTheDocument();
  });

  test('has proper ARIA attributes', () => {
    render(<UserAvatar user={mockUser} />);
    
    const avatarContainer = screen.getByLabelText('Avatar for John Doe');
    expect(avatarContainer).toHaveAttribute('role', 'img');
    expect(avatarContainer).toHaveAttribute('aria-label', 'Avatar for John Doe');
  });
});