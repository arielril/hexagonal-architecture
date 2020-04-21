export type User = {
  id: string;
  email: string;
  fullName: string;
};

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User['id']>;
  findUser(params: any): Promise<User[]>;
  updateUser(params: any): void;
}

export interface IUserService {
  createUser(user: Partial<User>): Promise<User['id']>;
  findUserById(id: User['id']): Promise<User>;
  findUsersByParams(params: any): Promise<User[]>;
}

export interface IUserUseCase {
  createBasicUser(props: Partial<User>): Promise<User>;
  createUserAndSendNotificationEmail(props: any): any;
}
