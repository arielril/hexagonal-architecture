import {
  IUserService,
  User,
} from '../../types/user';
import { ServiceContext } from '../../types/core';

export class UserService implements IUserService {
  private userRepository: ServiceContext['userRepository'];

  constructor(ctx: ServiceContext) {
    this.userRepository = ctx.userRepository;
  }

  createUser(user: Partial<User>): Promise<User['id']> {
    return this.userRepository.createUser(user);
  }

  async findUserById(id: User['id']): Promise<User> {
    const [user] = await this.userRepository.findUser({
      where: {
        id,
      },
    });

    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  findUsersByParams(params: object): Promise<User[]> {
    throw new Error(`Method not implemented.${params}`);
  }
}
