
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();

        table.text('vin', 128)
        .unique().notNullable();

        table.text('make', 128)
        .notNullable();

        table.text('model', 128)
        .notNullable();

        table.integer('mileage')
        .notNullable();

        table.text('transmissiontype');

        table.text('status');
    }).then(() => {
        console.log("cars table was successfully created!")
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
  .then("cars table was successfully dropped!");
};
