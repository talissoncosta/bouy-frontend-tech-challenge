import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../index';

describe('SearchInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    expect(screen.getByLabelText(/search users/i)).toBeInTheDocument();
  });

  test('renders with custom props', () => {
    render(
      <SearchInput 
        value="test"
        onChange={mockOnChange}
        placeholder="Custom placeholder"
        aria-label="Custom label"
      />
    );
    
    expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
  });

  test('calls onChange when user types', async () => {
    render(<SearchInput value="" onChange={mockOnChange} />);
    
    const searchInput = screen.getByLabelText(/search users/i);
    await userEvent.type(searchInput, 'test');
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('displays current value', () => {
    render(<SearchInput value="current value" onChange={mockOnChange} />);
    
    const searchInput = screen.getByLabelText(/search users/i);
    expect(searchInput).toHaveValue('current value');
  });
});