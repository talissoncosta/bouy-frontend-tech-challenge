import FakeService from "services/base/fakeService";
import { PaginatedResult } from "services/base/interface";
import { UserData, UsersService } from "./interface";

// Sample data that matches the structure we'll get from dummyjson.com
// This includes the required users for acceptance criteria testing
let fakeUserData: UserData[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    image: "https://picsum.photos/id/1/200/300",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith", 
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    image: "https://picsum.photos/id/2/200/300",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    fullName: "Bob Johnson",
    email: "bob.johnson@example.com",
    image: "https://picsum.photos/id/3/200/300",
  },
  {
    id: 4,
    firstName: "Miles",
    lastName: "Cummerata",
    fullName: "Miles Cummerata", 
    email: "miles.cummerata@example.com",
    image: "https://picsum.photos/id/4/200/300",
  },
  {
    id: 5,
    firstName: "Alice",
    lastName: "Williams",
    fullName: "Alice Williams",
    email: "alice.williams@example.com",
    image: "https://picsum.photos/id/5/200/300",
  },
  {
    id: 6,
    firstName: "Charlie",
    lastName: "Brown",
    fullName: "Charlie Brown",
    email: "charlie.brown@example.com",
    image: "https://picsum.photos/id/6/200/300",
  },
  {
    id: 7,
    firstName: "Diana",
    lastName: "Davis",
    fullName: "Diana Davis", 
    email: "diana.davis@example.com",
    image: "https://picsum.photos/id/7/200/300",
  },
  {
    id: 8,
    firstName: "Edward",
    lastName: "Miller",
    fullName: "Edward Miller",
    email: "edward.miller@example.com",
    image: "https://picsum.photos/id/8/200/300",
  },
  {
    id: 9,
    firstName: "Fiona",
    lastName: "Wilson",
    fullName: "Fiona Wilson",
    email: "fiona.wilson@example.com",
    image: "https://picsum.photos/id/9/200/300",
  },
  {
    id: 10,
    firstName: "George",
    lastName: "Taylor",
    fullName: "George Taylor",
    email: "george.taylor@example.com",
    image: "https://picsum.photos/id/10/200/300",
  },
  {
    id: 11,
    firstName: "Hannah",
    lastName: "Anderson",
    fullName: "Hannah Anderson",
    email: "hannah.anderson@example.com",
    image: "https://picsum.photos/id/11/200/300",
  },
  {
    id: 12,
    firstName: "Ian",
    lastName: "Thomas",
    fullName: "Ian Thomas",
    email: "ian.thomas@example.com",
    image: "https://picsum.photos/id/12/200/300",
  },
  {
    id: 13,
    firstName: "Julia",
    lastName: "Jackson",
    fullName: "Julia Jackson",
    email: "julia.jackson@example.com",
    image: "https://picsum.photos/id/13/200/300",
  },
  {
    id: 14,
    firstName: "Kevin",
    lastName: "White",
    fullName: "Kevin White",
    email: "kevin.white@example.com",
    image: "https://picsum.photos/id/14/200/300",
  },
  {
    id: 15,
    firstName: "Laura",
    lastName: "Harris",
    fullName: "Laura Harris",
    email: "laura.harris@example.com",
    image: "https://picsum.photos/id/15/200/300",
  },
  {
    id: 16,
    firstName: "Michael",
    lastName: "Clark",
    fullName: "Michael Clark",
    email: "michael.clark@example.com",
    image: "https://picsum.photos/id/16/200/300",
  },
  {
    id: 17,
    firstName: "Natalie",
    lastName: "Lewis",
    fullName: "Natalie Lewis",
    email: "natalie.lewis@example.com",
    image: "https://picsum.photos/id/17/200/300",
  },
  {
    id: 18,
    firstName: "Oliver",
    lastName: "Robinson",
    fullName: "Oliver Robinson",
    email: "oliver.robinson@example.com",
    image: "https://picsum.photos/id/18/200/300",
  },
  {
    id: 19,
    firstName: "Patricia",
    lastName: "Walker",
    fullName: "Patricia Walker",
    email: "patricia.walker@example.com",
    image: "https://picsum.photos/id/19/200/300",
  },
  {
    id: 20,
    firstName: "Quentin",
    lastName: "Perez",
    fullName: "Quentin Perez",
    email: "quentin.perez@example.com",
    image: "https://picsum.photos/id/20/200/300",
  },
  {
    id: 21,
    firstName: "Rachel",
    lastName: "Hall",
    fullName: "Rachel Hall",
    email: "rachel.hall@example.com",
    image: "https://picsum.photos/id/21/200/300",
  },
  {
    id: 22,
    firstName: "Samuel",
    lastName: "Young",
    fullName: "Samuel Young",
    email: "samuel.young@example.com",
    image: "https://picsum.photos/id/22/200/300",
  },
  {
    id: 23,
    firstName: "Tiffany",
    lastName: "Allen",
    fullName: "Tiffany Allen",
    email: "tiffany.allen@example.com",
    image: "https://picsum.photos/id/23/200/300",
  },
  {
    id: 24,
    firstName: "Victor",
    lastName: "King",
    fullName: "Victor King",
    email: "victor.king@example.com",
    image: "https://picsum.photos/id/24/200/300",
  },
  {
    id: 25,
    firstName: "Wendy",
    lastName: "Wright",
    fullName: "Wendy Wright",
    email: "wendy.wright@example.com",
    image: "https://picsum.photos/id/25/200/300",
  },
  {
    id: 26,
    firstName: "Xavier",
    lastName: "Lopez",
    fullName: "Xavier Lopez",
    email: "xavier.lopez@example.com",
    image: "https://picsum.photos/id/26/200/300",
  }
];

export class UsersFakeService extends FakeService<PaginatedResult<UserData>> implements UsersService {
  constructor(latencyDuration = 1000, errorProbability = 0) {
    super(latencyDuration, errorProbability);
  }

  async getUsersByQuery(query?: string): Promise<PaginatedResult<UserData> | undefined> {
    let filteredData = fakeUserData;
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredData = fakeUserData.filter(user => 
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery) ||
        user.fullName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
      );
    }
    
    return this.simulateRequest(
      () => ({
        list: filteredData,
        nextCursor: filteredData.length > 30 ? "30" : undefined,
        prevCursor: undefined,
      }),
      () => {}
    );
  }
}