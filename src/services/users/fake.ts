import FakeService from "services/base/fakeService";
import { UserData } from "./interface";
import { PaginatedResult } from "services/base/interface";

let fakeUserData: UserData[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    image: "https://external-preview.redd.it/fBai3DKZrSGf3YRd89f9pUHJua_lyGNS3LF0I-joA8Y.jpg?auto=webp&s=a2792118a8b080350240abc745d3ca6e53f18ca1",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    image: "https://picsum.photos/id/2/200/300",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    image: "https://picsum.photos/id/3/200/300",
  },
  {
    id: 4,
    firstName: "Alice",
    lastName: "Williams",
    email: "alice.williams@example.com",
    image: "https://picsum.photos/id/4/200/300",
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    image: "https://picsum.photos/id/5/200/300",
  },
  {
    id: 6,
    firstName: "Diana",
    lastName: "Davis",
    email: "diana.davis@example.com",
    image: "https://picsum.photos/id/6/200/300",
  },
  {
    id: 7,
    firstName: "Edward",
    lastName: "Miller",
    email: "edward.miller@example.com",
    image: "https://picsum.photos/id/7/200/300",
  },
  {
    id: 8,
    firstName: "Fiona",
    lastName: "Wilson",
    email: "fiona.wilson@example.com",
    image: "https://picsum.photos/id/8/200/300",
  },
  {
    id: 9,
    firstName: "George",
    lastName: "Taylor",
    email: "george.taylor@example.com",
    image: "https://picsum.photos/id/9/200/300",
  },
  {
    id: 10,
    firstName: "Hannah",
    lastName: "Anderson",
    email: "hannah.anderson@example.com",
    image: "https://picsum.photos/id/10/200/300",
  },
  {
    id: 11,
    firstName: "Ian",
    lastName: "Thomas",
    email: "ian.thomas@example.com",
    image: "https://picsum.photos/id/11/200/300",
  },
  {
    id: 12,
    firstName: "Julia",
    lastName: "Jackson",
    email: "julia.jackson@example.com",
    image: "https://picsum.photos/id/12/200/300",
  },
  {
    id: 13,
    firstName: "Kevin",
    lastName: "White",
    email: "kevin.white@example.com",
    image: "https://picsum.photos/id/13/200/300",
  },
  {
    id: 14,
    firstName: "Laura",
    lastName: "Harris",
    email: "laura.harris@example.com",
    image: "https://picsum.photos/id/14/200/300",
  },
  {
    id: 15,
    firstName: "Michael",
    lastName: "Clark",
    email: "michael.clark@example.com",
    image: "https://picsum.photos/id/15/200/300",
  },
  {
    id: 16,
    firstName: "Natalie",
    lastName: "Lewis",
    email: "natalie.lewis@example.com",
    image: "https://picsum.photos/id/16/200/300",
  },
  {
    id: 17,
    firstName: "Oliver",
    lastName: "Robinson",
    email: "oliver.robinson@example.com",
    image: "https://picsum.photos/id/17/200/300",
  },
  {
    id: 18,
    firstName: "Patricia",
    lastName: "Walker",
    email: "patricia.walker@example.com",
    image: "https://picsum.photos/id/18/200/300",
  },
  {
    id: 19,
    firstName: "Quentin",
    lastName: "Perez",
    email: "quentin.perez@example.com",
    image: "https://picsum.photos/id/19/200/300",
  },
  {
    id: 20,
    firstName: "Rachel",
    lastName: "Hall",
    email: "rachel.hall@example.com",
    image: "https://picsum.photos/id/20/200/300",
  },
  {
    id: 21,
    firstName: "Samuel",
    lastName: "Young",
    email: "samuel.young@example.com",
    image: "https://picsum.photos/id/21/200/300",
  },
  {
    id: 22,
    firstName: "Tiffany",
    lastName: "Allen",
    email: "tiffany.allen@example.com",
    image: "https://picsum.photos/id/22/200/300",
  },
  {
    id: 23,
    firstName: "Victor",
    lastName: "King",
    email: "victor.king@example.com",
    image: "https://picsum.photos/id/23/200/300",
  },
  {
    id: 24,
    firstName: "Wendy",
    lastName: "Wright",
    email: "wendy.wright@example.com",
    image: "https://picsum.photos/id/24/200/300",
  },
  {
    id: 25,
    firstName: "Xavier",
    lastName: "Lopez",
    email: "xavier.lopez@example.com",
    image: "https://picsum.photos/id/25/200/300",
  }
];

export class UsersFakeService extends FakeService<UserData> {
  constructor(latencyDuration = 0, errorProbability = 0) {
    super(latencyDuration, errorProbability);
  }

  async getUsersByQuery(query?: string): Promise<PaginatedResult<UserData> | undefined> {
    let filteredData = fakeUserData;
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredData = fakeUserData.filter(user => 
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
      );
    }
    
    return this.simulatePaginatedRequest(
      () => ({
        list: filteredData,
        nextCursor: "",
        prevCursor: "",
      }),
      () => {}
    );
  }
}
