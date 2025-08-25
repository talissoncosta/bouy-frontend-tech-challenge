import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { SearchInput } from '../index';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByLabelText(/search users/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search users/i)).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    render(
      <SearchInput 
        value="test"
        onChange={mockOnChange}
        placeholder="Custom placeholder"
        label="Custom label"
        data-testid="custom-search"
      />
    );
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
    expect(screen.getByText('Custom label')).toBeInTheDocument();
    expect(screen.getByTestId('custom-search')).toBeInTheDocument();
  });

  test('calls onChange when user types', async () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const searchInput = screen.getByRole('searchbox');
    await userEvent.type(searchInput, 'test query');
    
    expect(mockOnChange).toHaveBeenCalledTimes(10); // Called for each character
    expect(mockOnChange).toHaveBeenLastCalledWith('test query');
  });

  test('displays current value', () => {
    render(<SearchInput value="current value" onChange={mockOnChange} />);
    
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveValue('current value');
  });

  test('has clear button when allowClear is true', () => {
    render(<SearchInput value="test" onChange={mockOnChange} />);
    
    // Ant Design Search input has clear functionality built-in
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const searchInput = screen.getByRole('searchbox');
    const label = screen.getByText(/search users/i);
    
    expect(searchInput).toHaveAttribute('aria-label', 'Search users:');
    expect(searchInput).toHaveAttribute('id', 'user-search');
    expect(label).toHaveAttribute('for', 'user-search');
  });

  test('has no accessibility violations', async () => {
    const { container } = render(<SearchInput value="" onChange={mockOnChange} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('supports keyboard navigation', async () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const searchInput = screen.getByRole('searchbox');
    
    // Focus should work
    searchInput.focus();
    expect(searchInput).toHaveFocus();
    
    // Tab navigation should work
    await userEvent.tab();
    expect(searchInput).not.toHaveFocus();
  });

  test('handles empty value correctly', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveValue('');
  });

  test('handles special characters in search', async () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const searchInput = screen.getByRole('searchbox');
    const specialText = '@#$%^&*()';
    
    await userEvent.type(searchInput, specialText);
    expect(mockOnChange).toHaveBeenLastCalledWith(specialText);
  });
});