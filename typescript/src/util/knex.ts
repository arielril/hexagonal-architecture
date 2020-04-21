import knex from 'knex';

import knexfile from '../../knexfile';

let db: knex;
export default function getDbConn(): knex {
  if (!db) {
    db = knex(knexfile);
  }

  return db;
}
