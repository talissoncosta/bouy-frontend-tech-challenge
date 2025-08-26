import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ComponentProps } from 'react';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
} & ComponentProps<typeof Input>

export const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search users...",
  'aria-label': ariaLabel = "Search users",
  ...props
}: SearchInputProps) => (
  <Input 
    addonBefore={<SearchOutlined />}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    allowClear
    placeholder={placeholder}
    aria-label={ariaLabel}
    {...props}
  />
);