import { PaginatedResult } from "services/base/interface";

export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  }
  
  export interface UsersResponse {
    users: UserData[];
    total: number;
  }

  export abstract class UsersService {
    abstract getUsersByQuery(query?: string): Promise<PaginatedResult<UserData> | undefined>;
  }