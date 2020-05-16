export type User = {
  id: string;
  email: string;
  fullName: string;
};

export type FindUserParam = {
  where: {
    id?: User['id'];
  };
};

export interface IUserRepository {
  createUser(user: Partial<User>): Promise<User['id']>;
  findUser(params: FindUserParam): Promise<User[]>;
  registerUserCreated(user: Partial<User>): Promise<boolean>;
  registerUserUpdated(user: Partial<User>): Promise<boolean>;
}

export interface IUserService {
  createUser(user: Partial<User>): Promise<User['id']>;
  findUserById(id: User['id']): Promise<User>;
  findUsersByParams(params: FindUserParam): Promise<User[]>;
}

export interface IUserUseCase {
  createBasicUser(props: Partial<User>): Promise<User>;
  findUserById(userId: User['id']): Promise<User>;
}
