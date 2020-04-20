export type User = {
  id: string;
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
  createBasicUser(props: any): any;
  createUserAndSendNotificationEmail(props: any): any;
}
