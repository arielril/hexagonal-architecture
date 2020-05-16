import { env } from './src/util/env';
import { Logger } from './src/util/logger';

module.exports = {
  client: 'mysql2',
  debug: env.mysqlDebug || false,
  connection: {
    host: env.mysqlHost,
    port: env.mysqlPort,
    user: env.mysqlUser,
    password: env.mysqlPassword,
    database: env.mysqlSchema,
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true,
    dateStrings: true,
  },
  pool: {
    min: env.mysqlPoolMin,
    max: env.mysqlPoolMax,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterCreate: function _(connection: any, done: Function) {
      connection.query('SET time_zone = "UTC";', function er(err: Error) {
        if (err) {
          Logger.warn(err, 'failed to initialize mysql database connection');
        } else {
          Logger.debug('mysql database connected');
        }
        done(err, connection);
      });
    },
  },
};
