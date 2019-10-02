exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
        table.increments('id')
        table.string('name')
        table.boolean('isActive')
        table.integer('cohortId')
        table.foreign('cohortId').references('cohorts.id')
    })
};

exports.down = function(knex) {
    
  return knex.schema.raw('DROP TABLE students');

};