import { useCallback } from "react";
import { UserData } from "services/users/interface";

export const useUserActions = () => {
  const handleViewUser = useCallback((user: UserData) => {
    console.log('View user:', user);
    // TODO: Implement user view modal/page
  }, []);

  const handleEditUser = useCallback((user: UserData) => {
    console.log('Edit user:', user);
    // TODO: Implement user edit modal/form
  }, []);

  return {
    handleViewUser,
    handleEditUser,
  };
}
