import { User } from './user.entity';

export interface IUserData {
  bio: string;
  email: string;
  image?: string;
  token: string;
  username: string;
}

export interface IUserRO {
  user: IUserData;
}

export interface IUsersRO {
  users: User[];
}
