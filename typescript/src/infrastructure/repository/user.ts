import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { IUserRepository, User, FindUserParam } from '../../types/user';
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

  async findUser(params: FindUserParam): Promise<User[]> {
    return this.mysqlAdapter
      .db
      .where({
        id: params?.where?.id,
      });
  }
}
