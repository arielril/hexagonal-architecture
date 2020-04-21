import env from './src/util/env';

/**
 * @type {import('knex').Config}
 */
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
    // @ts-ignore
    afterCreate: function _(connection, done) {
      // @ts-ignore
      // tslint:disable-next-line: ter-prefer-arrow-callback
      connection.query('SET time_zone = "UTC";', function er(err) {
        done(err, connection);
      });
    },
  },
  migrations: {
    tableName: 'migrations',
  },
};
