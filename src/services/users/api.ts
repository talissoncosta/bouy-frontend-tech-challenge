import { AuthedService } from "services/base/authedService";
import { PaginatedResult } from "services/base/interface";
import { UserData, UsersService } from "./interface";
    
export class UsersApiService extends AuthedService implements UsersService {
  async getUsersByQuery(query?: string) {
    const uri = query ? `/users/?query=${query}` : `/users`;
    const response = await this.get(uri);
    return response as PaginatedResult<UserData>;
  }
}
