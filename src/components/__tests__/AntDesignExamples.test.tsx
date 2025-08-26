import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Input, Space } from 'antd';

// Only test components that work reliably with Ant Design + RTL
// Avoid: Button (wave effects), Form (responsive observer), Modal (portals), Dropdown (complex)

// Example 1: Input component test - this works well
describe('Ant Design Input', () => {
  test('handles input changes correctly', async () => {
    const TestInput = () => {
      const [value, setValue] = useState('');
      
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter text"
          data-testid="test-input"
        />
      );
    };
    
    render(<TestInput />);
    
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    
    fireEvent.change(input, { target: { value: 'Hello World' } });
    
    await waitFor(() => {
      expect(input).toHaveValue('Hello World');
    });
  });

  test('supports different input types', () => {
    render(
      <Space direction="vertical">
        <Input placeholder="Text input" />
        <Input.Password placeholder="Password input" />
        <Input.TextArea placeholder="Textarea input" />
      </Space>
    );
    
    expect(screen.getByPlaceholderText('Text input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Textarea input')).toBeInTheDocument();
  });

  test('supports allowClear functionality', () => {
    const TestInput = () => {
      const [value, setValue] = useState('test value');
      
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          allowClear
          data-testid="clearable-input"
        />
      );
    };
    
    render(<TestInput />);
    
    const input = screen.getByTestId('clearable-input');
    expect(input).toHaveValue('test value');
    
    // Find and click the clear button using aria-label
    const clearButton = screen.getByLabelText('close-circle');
    fireEvent.click(clearButton);
    
    expect(input).toHaveValue('');
  });
});

// Example 2: Space component test - this works well
describe('Ant Design Space', () => {
  test('renders children with spacing', () => {
    render(
      <Space data-testid="space-container">
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </Space>
    );
    
    const spaceContainer = screen.getByTestId('space-container');
    expect(spaceContainer).toBeInTheDocument();
    expect(spaceContainer).toHaveClass('ant-space');
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  test('supports different directions', () => {
    const { rerender } = render(
      <Space direction="horizontal" data-testid="horizontal-space">
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>
    );
    
    expect(screen.getByTestId('horizontal-space')).toHaveClass('ant-space-horizontal');
    
    rerender(
      <Space direction="vertical" data-testid="vertical-space">
        <span>Item 1</span>
        <span>Item 2</span>
      </Space>
    );
    
    expect(screen.getByTestId('vertical-space')).toHaveClass('ant-space-vertical');
  });
});

// Example 3: Simple form validation without Ant Design Form
describe('Custom Form Validation', () => {
  test('validates required fields', async () => {
    const TestForm = () => {
      const [errors, setErrors] = useState<string[]>([]);
      const [username, setUsername] = useState('');
      
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = [];
        if (!username.trim()) {
          newErrors.push('Username is required');
        }
        setErrors(newErrors);
      };
      
      return (
        <form onSubmit={handleSubmit} data-testid="custom-form">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            data-testid="username-input"
          />
          <button type="submit" data-testid="submit-button">
            Submit
          </button>
          {errors.map((error, index) => (
            <div key={index} data-testid="error-message">
              {error}
            </div>
          ))}
        </form>
      );
    };
    
    render(<TestForm />);
    
    // Submit without filling required field
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    
    // Should show validation error
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Username is required');
    });
    
    // Fill the required field
    const usernameInput = screen.getByTestId('username-input');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    
    // Submit again
    fireEvent.click(submitButton);
    
    // Error should be gone
    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });
});

// Example 4: Input with different states
describe('Input States', () => {
  test('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" data-testid="disabled-input" />);
    
    const input = screen.getByTestId('disabled-input');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('placeholder', 'Disabled input');
  });

  test('handles readOnly state', () => {
    render(<Input readOnly value="Read only value" data-testid="readonly-input" />);
    
    const input = screen.getByTestId('readonly-input');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveValue('Read only value');
  });

  test('handles different sizes', () => {
    const { rerender } = render(
      <Input size="large" placeholder="Large input" data-testid="large-input" />
    );
    
    expect(screen.getByTestId('large-input')).toHaveClass('ant-input-lg');
    
    rerender(<Input size="small" placeholder="Small input" data-testid="small-input" />);
    
    expect(screen.getByTestId('small-input')).toHaveClass('ant-input-sm');
  });
});

// Example 5: Input with addons
describe('Input with Addons', () => {
  test('renders input with addonBefore', () => {
    render(
      <Input 
        addonBefore="@"
        placeholder="Username"
        data-testid="input-with-addon"
      />
    );
    
    const input = screen.getByTestId('input-with-addon');
    expect(input).toBeInTheDocument();
    
    // Check that addon is present
    const addon = screen.getByText('@');
    expect(addon).toBeInTheDocument();
  });

  test('renders input with addonAfter', () => {
    render(
      <Input 
        addonAfter=".com"
        placeholder="Domain"
        data-testid="input-with-addon-after"
      />
    );
    
    const input = screen.getByTestId('input-with-addon-after');
    expect(input).toBeInTheDocument();
    
    // Check that addon is present
    const addon = screen.getByText('.com');
    expect(addon).toBeInTheDocument();
  });
});

