const express = require('express');
const db = require('../data/db-config');
const router = express.Router();

function validateCarParams(req, res, next) {
    const carToBeInserted = req.body;
    if (!carToBeInserted) {
      res.status(400).json({ message: "missing car data to be inserted" });
    } else if (!carToBeInserted.vin) {
      res.status(400).json({ message: "missing required vin field for car record to be created" });
    }
    else if (!carToBeInserted.make) {
        res.status(400).json({ message: "missing required make field for car record to be created" });
    } 
    else if (!carToBeInserted.model) {
        res.status(400).json({ message: "missing required model field for car record to be created" });
    }
    else if (!carToBeInserted.mileage) {
        res.status(400).json({ message: "missing required mileage field for car record to be created" });
    }
    else {
      next();
    }
  }

router.get('/', async(req, res) => {
    try {
        db('cars')
        .then(cars => {
        res.status(200).json(cars); 
    })

    }catch(error){
        res.status(500).json({ message: `Failed to retrieve cars records: ${err.message}` });
    }
    
  });

  router.post('/', validateCarParams, (req, res) => {
    const { vin, make, model, mileage, transmissiontype, status } = req.body;
    const newCarToBeInserted = {
        vin,
        make,
        model,
        mileage,
        transmissiontype,
        status
    }
    db('cars').insert(newCarToBeInserted)
      .then(newCarEntry => {
        res.status(201).json(newCarEntry);
      })
    .catch (err => {
      res.status(500).json({ message: `Failed to store new car entry: ${err.message} `});
    });
  });
  
module.exports = router;