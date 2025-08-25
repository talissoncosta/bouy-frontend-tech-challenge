import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search users...",
  'aria-label': ariaLabel = "Search users",
  'data-testid': testId
}: SearchInputProps) {
  return (
    <Input addonBefore={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      data-testid={testId}
      aria-label={ariaLabel}
      placeholder={placeholder}
    />
  );
}