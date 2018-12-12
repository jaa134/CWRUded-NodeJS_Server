var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res) {
  db.getAllLocations(function (data) {
    if (!data)
      console.log('Error retrieving locations!');
    else 
      res.render('index', { title: 'CWRUded', locations: data });
  });
});

router.get('/api/locations', function(req, res) {
  db.getAllLocations(function (data) {
    if (!data)
      console.log('Error retrieving locations!');
    else {
      res.status(200)
        .json({
          status: 'success',
          message: 'Retrieved locations...',
          data: data
        });
    }
  });
});

module.exports = router;
