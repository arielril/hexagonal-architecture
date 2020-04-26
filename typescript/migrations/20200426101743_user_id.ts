import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (t) => {
    t.string('id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('user', (t) => {
    t.dropColumn('id');
  });
}
