import { useState, useMemo } from "react";
import { useDebounce } from "hooks";
import { UserData } from "services/users/interface";

export const useUserSearch = (data: UserData[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredData = useMemo(() => {
    if (!data) return [];
    
    if (!debouncedSearchTerm) return data;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return data.filter((user: UserData) => {
      return user.firstName.toLowerCase().includes(searchLower) ||
             user.lastName.toLowerCase().includes(searchLower) ||
             user.email.toLowerCase().includes(searchLower) ||
             user.fullName.toLowerCase().includes(searchLower);
    });
  }, [data, debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
}
