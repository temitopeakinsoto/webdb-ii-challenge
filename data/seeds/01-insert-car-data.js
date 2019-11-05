exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        { vin: '234', make: "Benz", model: "Benz", mileage: 3000, transmissiontype:"automatic", status:"ok" },
        { vin: '435', make: "Bentley", model: "Bentley", mileage: 500, transmissiontype:"automatic"},
        { vin: '678', make: "Aston Martin", model: "Aston Martin", mileage: 300 }
      ]);
    });
};