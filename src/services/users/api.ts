import { PaginatedResult } from "services/base/interface";
import { DummyJsonUsersResponse, DummyJsonUser, UserData, UsersService } from "./interface";

export class UsersApiService extends UsersService {
  private transformDummyJsonUser(dummyUser: DummyJsonUser): UserData {
    return {
      id: dummyUser.id,
      firstName: dummyUser.firstName,
      lastName: dummyUser.lastName,
      fullName: `${dummyUser.firstName} ${dummyUser.lastName}`,
      email: dummyUser.email,
      image: dummyUser.image,
    };
  }

  async getUsersByQuery(query?: string): Promise<PaginatedResult<UserData> | undefined> {
    try {
      // Use dummyjson.com API
      let url = "https://dummyjson.com/users";
      
      // Add search query if provided
      if (query) {
        url += `/search?q=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DummyJsonUsersResponse = await response.json();

      // Transform DummyJSON format to our PaginatedResult format
      return {
        list: data.users.map(user => this.transformDummyJsonUser(user)),
        nextCursor: data.skip + data.limit < data.total ? String(data.skip + data.limit) : undefined,
        prevCursor: data.skip > 0 ? String(Math.max(0, data.skip - data.limit)) : undefined,
      };
    } catch (error) {
      console.error("Error fetching users from dummyjson.com:", error);
      throw error;
    }
  }
}
