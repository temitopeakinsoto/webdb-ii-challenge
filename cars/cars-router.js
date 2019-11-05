const express = require('express');
const db = require('../data/db-config');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
      res.status(200).json(cars); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve cars information' });
    });
  });
  
module.exports = router;