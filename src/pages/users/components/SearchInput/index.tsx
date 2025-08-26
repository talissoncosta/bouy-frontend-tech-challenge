import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search users...",
  'aria-label': ariaLabel = "Search users"
}: SearchInputProps) {
  return (
    <Input 
      addonBefore={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      aria-label={ariaLabel}
      placeholder={placeholder}
    />
  );
}