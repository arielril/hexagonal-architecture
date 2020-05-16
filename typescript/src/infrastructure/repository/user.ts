import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import {
  IUserRepository,
  User,
  FindUserParam,
} from '../../types/user';
import {
  IMysqlAdapter,
  IMessageBusAdapter,
  IMessageBusAdapterConstructs,
} from '../../types/infrastructure';

type Context = {
  mysqlAdapter: IMysqlAdapter;
  messageBusAdapter: IMessageBusAdapterConstructs;
};

export class UserRepository implements IUserRepository {
  private mysqlAdapter: Context['mysqlAdapter'];
  private messageBusAdapter: IMessageBusAdapter;

  constructor({
    mysqlAdapter,
    messageBusAdapter,
  }: Context) {
    this.mysqlAdapter = mysqlAdapter;
    this.mysqlAdapter.tableName = 'user';
    // eslint-disable-next-line new-cap
    this.messageBusAdapter = new messageBusAdapter();
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

  async registerUserCreated(user: Partial<User>): Promise<boolean> {
    // * Handle the errors from registering this event here!
    return this.messageBusAdapter
      .publish('user.dx', 'user.created', user);
  }

  async registerUserUpdated(user: Partial<User>): Promise<boolean> {
    return this.messageBusAdapter
      .publish('user.dx', 'user.updated', user);
  }
}
