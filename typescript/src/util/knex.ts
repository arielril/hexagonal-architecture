import knex from 'knex';

import knexfile = require('../../knexfile');

let db: knex;
export default function getDbConn(): knex {
  if (!db) {
    db = knex(knexfile);
  }

  return db;
}
