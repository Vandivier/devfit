type Tag = any;

interface User {
  id: number;
  username: string;
  password?: string;
  posts?: Post[];
  likes?: Like[];
  tags?: Tag[];
}

interface Like {
  user: User;
  userId: number;
  post: any;
  postId: number;
}

interface Post {
  id: number;
  caption?: string;
  videoUrl?: string;
  challenge?: any;
  challengeId?: number;
  createdAt?: any; // Date?;
  user: User;
  userId?: number; // TODO: redundant?
  likes: Like[];
}

const mockSam = {
  id: 1,
  username: 'Sam',
  // password: string;
  // posts: Post[];
  // likes: Like[];
  // tags: Tag[];
};

const mockJimmy = {
  id: 2,
  username: 'Jimmy',
};

const mockPost1 = {
  id: 1,
  caption: 'Jimmy did a pushup',
  user: mockJimmy,
  likes: [],
};

const mockPost2 = {
  id: 2,
  caption: 'Sam ran a mile',
  user: mockSam,
  likes: [],
};

const mockPost3 = {
  id: 3,
  caption: 'Jimmy hit some squats',
  user: mockJimmy,
  likes: [],
};

export class MockPrismaClient {    
    post = {
      findMany: () =>[mockPost1, mockPost2, mockPost3]
    }

    raw = s => {
      const firstLine = s.split('\n')[0];

      switch (firstLine && firstLine.trim()) {
        case 'select u.id, u.username, sum(C."basePointValue") points from "User" u':
          return [mockSam, mockJimmy]
      }
    }
}
