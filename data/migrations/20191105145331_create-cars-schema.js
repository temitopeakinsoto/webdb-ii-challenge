
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();

        table.text('vin', 128)
        .unique().notNullAble();

        table.text('make', 128)
        .notNullAble();

        table.text('model', 128)
        .notNullAble();

        table.integer('mileage')
        .notNullAble();

        table.text('transmissiontype');

        table.text('status');
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
