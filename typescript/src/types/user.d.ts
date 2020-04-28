export type User = {
  id: string;
  email: string;
  fullName: string;
};

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User['id']>;
  findUser(params: object): Promise<User[]>;
  updateUser(params: object): void;
}

export interface IUserService {
  createUser(user: Partial<User>): Promise<User['id']>;
  findUserById(id: User['id']): Promise<User>;
  findUsersByParams(params: object): Promise<User[]>;
}

export interface IUserUseCase {
  createBasicUser(props: Partial<User>): Promise<User>;
  createUserAndSendNotificationEmail(props: object): object;
}
