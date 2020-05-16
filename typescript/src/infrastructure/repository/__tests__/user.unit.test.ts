import { Chance } from 'chance';
import joi from '@hapi/joi';

import { UserRepository } from '../user';
import { MysqlAdapter } from '../../adapter/mysql';

import { MessageBusAdapter } from '../../adapter/messageBus';

import { MysqlDatabase } from '../../../types/infrastructure';

const chance = new Chance();

describe('user repository', () => {
  describe('#constructor', () => {
    it('constructs with all properties', () => {
      const mysqlAdapter = new MysqlAdapter({
        dbConn: jest.fn() as unknown as MysqlDatabase,
      });
      const u = new UserRepository({
        mysqlAdapter,
        messageBusAdapter: MessageBusAdapter,
      });

      expect(u).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(mysqlAdapter._tbName).toEqual('user');
      expect(u.createUser).toBeInstanceOf(Function);
      expect(u.findUser).toBeInstanceOf(Function);
    });
  });

  describe('#createUser', () => {
    it('create a good user', async () => {
      const dbConn = jest.fn(() => {
        return {
          insert: jest.fn().mockResolvedValue(true),
        };
      }) as unknown as MysqlDatabase;
      const mysqlAdapter = new MysqlAdapter({ dbConn });
      const u = new UserRepository({
        mysqlAdapter,
        messageBusAdapter: MessageBusAdapter,
      });

      const goodUser = {
        email: chance.email(),
        fullName: chance.name({ full: true }),
      };

      const goodUserId = await u.createUser(goodUser);

      expect(goodUserId).toMatchSchema(
        joi.string().guid({ version: 'uuidv4' }).required(),
      );
    });

    it('fails to create a good user', async () => {
      const dbConn = jest.fn(() => {
        return {
          insert: jest.fn().mockRejectedValue(false),
        };
      }) as unknown as MysqlDatabase;
      const mysqlAdapter = new MysqlAdapter({ dbConn });
      const u = new UserRepository({
        mysqlAdapter,
        messageBusAdapter: MessageBusAdapter,
      });

      const goodUser = {
        email: chance.email(),
        fullName: chance.name({ full: true }),
      };

      try {
        await u.createUser(goodUser);
        throw new Error('test failed. it shouldn\'t create a user');
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBe(false);
      }
    });
  });
});
