var data = require('../data/locations');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'CWRUded' });
});

router.get('/api/locations', function(req, res) {
  res.status(200).json(data.locations);
});

module.exports = router;