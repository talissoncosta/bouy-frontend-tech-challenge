import { useQuery } from "@tanstack/react-query";
import usersService from "services/users";

export const useUsers = (query?: string) => {
    return useQuery({
        queryKey: ['users', query],
        queryFn: () => usersService.getUsersByQuery(query),
    });
};