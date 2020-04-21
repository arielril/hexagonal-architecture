import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { IUserRepository, User } from '../../types/user';
import { IMysqlAdapter } from '../../types/infrastructure';

type Context = {
  mysqlAdapter: IMysqlAdapter;
};

export class UserRepository implements IUserRepository {
  private mysqlAdapter: IMysqlAdapter;

  constructor({ mysqlAdapter }: Context) {
    this.mysqlAdapter = mysqlAdapter;
    this.mysqlAdapter.tableName = 'user';
  }

  async createUser(user: Partial<User>): Promise<User['id']> {
    const userId = uuid();
    const __user__ = R.assoc('id', userId, user);

    return this.mysqlAdapter
      .db
      .insert(__user__)
      .then(() => userId);
  }

  // eslint-disable-next-line class-methods-use-this
  async findUser(params: any): Promise<User[]> {
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  updateUser(params: any): void {
    throw new Error('Method not implemented.');
  }
}
