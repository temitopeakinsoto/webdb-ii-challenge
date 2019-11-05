const express = require("express");
const db = require("../data/db-config");
const router = express.Router();

function validateCarParams(req, res, next) {
  const carToBeInserted = req.body;
  if (!carToBeInserted) {
    res.status(400).json({ message: "missing car data to be inserted" });
  } else if (!carToBeInserted.vin) {
    res
      .status(400)
      .json({
        message: "missing required vin field for car record to be created"
      });
  } else if (!carToBeInserted.make) {
    res
      .status(400)
      .json({
        message: "missing required make field for car record to be created"
      });
  } else if (!carToBeInserted.model) {
    res
      .status(400)
      .json({
        message: "missing required model field for car record to be created"
      });
  } else if (!carToBeInserted.mileage) {
    res
      .status(400)
      .json({
        message: "missing required mileage field for car record to be created"
      });
  } else {
    next();
  }
}

function validateCarId(req, res, next) {
  db("cars")
    .where({ id: req.params.id })
    .then(car => {
      if (car[0]) {
        req.car = car;
        next();
      } else {
        res.status(400).json({ message: "invalid account id" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Something terrible happend while checking car id: ${error.message}`
      });
    });
}

router.get("/", async (req, res) => {
  try {
    db("cars").then(cars => {
      res.status(200).json(cars);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to retrieve cars records: ${err.message}` });
  }
});

router.get("/:id", validateCarId, (req, res) => {
    const { id } = req.params;
  
    db("cars")
      .where({ id })
      .first()
      .then(car => {
        res.status(200).json(car);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: `Failed to retrieve car: ${err.message}` });
      });
  });

router.post("/", validateCarParams, (req, res) => {
  const { vin, make, model, mileage, transmissiontype, status } = req.body;
  const newCarToBeInserted = {
    vin,
    make,
    model,
    mileage,
    transmissiontype,
    status
  };
  db("cars")
    .insert(newCarToBeInserted)
    .then(newCarEntry => {
      res.status(201).json(newCarEntry);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Failed to store new car entry: ${err.message} ` });
    });
});

router.put('/:id', validateCarParams, validateCarId, (req, res) => {
    const { vin, make, model, mileage, transmissiontype, status } = req.car;
    db('cars').where({ id: req.params.id })
      .update({ vin, make, model, mileage, transmissiontype, status })
      .then(affectedRecords => {
        res.json(affectedRecords + ' records got changed!' );
      })
      .catch(error => {
        res.status(500).json({ message: 'Something went wrong while trying to update this record: ' + error.message });
      });
  });


router.delete("/:id", validateCarId, (req, res) => {
    const { id } = req.params;
  
    db("cars")
      .where({ id })
      .first()
      .then(car => {
        res.status(200).json(car);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: `Failed to retrieve car: ${err.message}` });
      });
  });

module.exports = router;
