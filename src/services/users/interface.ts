import { PaginatedResult } from "services/base/interface";

// DummyJSON.com User interface - only fields we actually need
export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  // Note: API has many more fields, but we only need these for our table
}

// DummyJSON.com API Response structure
export interface DummyJsonUsersResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}

// Our UserData interface with the additional fullName field
export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string; // firstName + lastName combined for display
  email: string;
  image: string;
}

export abstract class UsersService {
  abstract getUsersByQuery(query?: string): Promise<PaginatedResult<UserData> | undefined>;
}