var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res) {
  db.getLocations(function (data) {
    if (!data)
      console.log('Error retrieving locations!');
    else 
      res.render('index', { title: 'CWRUded', locations: data });
  });
});

router.get('/api/locations', function(req, res) {
  db.getLocations(function (data) {
    if (!data)
      console.log('Error retrieving locations!');
    else {
      res.status(200)
        .json({
          locations: data
        });
    }
  });
});

router.put('/api/updateLocation', function(req, res) {
  db.updateLocation(req.body, function (result) {});
});

module.exports = router;
