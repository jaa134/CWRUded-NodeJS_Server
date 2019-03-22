var express = require('express');
var router = express.Router();

const type = {
  ACADEMIC: { text: 'academic', unicode: '\uf02d' },
  DINING: { text: 'dining', unicode: '\uf2e7' },
  GYM: { text: 'gym', unicode: '\uf44b' }
}

class Space {
  constructor(id, name, congestionRating) {
    this.id = id
    this.name = name;
    this.congestionRating = congestionRating;
  }
}

class Location {
  constructor(id, type, name, spaces) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.spaces = spaces;
  }
}

var randomCongestionValue = function (baseVal) {
  //value between (baseVal - 7) and (baseVal + 7)
  return baseVal + Math.floor((Math.random() * 14) - 7);
}

var randomLocationArray = function () {  
  var spacesKSL = [
    new Space(0, "1st Floor", randomCongestionValue(78)),
    new Space(1, "2nd Floor", randomCongestionValue(88)),
    new Space(2, "3rd Floor", randomCongestionValue(65))
  ]

  return [
    new Location(0, type.ACADEMIC.unicode, "Kelvin Smith Library",  spacesKSL),
    new Location(1, type.ACADEMIC.unicode, "Olin",                  [new Space(0, "General", randomCongestionValue(12))]),
    new Location(2, type.GYM.unicode,      "Veale Athletic Center", [new Space(0, "General", randomCongestionValue(54))]),
    new Location(3, type.DINING.unicode,   "Fribley Dining Hall",   [new Space(0, "General", randomCongestionValue(76))]),
    new Location(4, type.ACADEMIC.unicode, "Nord",                  [new Space(0, "General", randomCongestionValue(32))]),
    new Location(5, type.ACADEMIC.unicode, "Strosacker",            [new Space(0, "General", randomCongestionValue(21))]),
    new Location(6, type.GYM.unicode,      "Wyant Athletic Center", [new Space(0, "General", randomCongestionValue(93))]),
    new Location(7, type.DINING.unicode,   "Leutner Dining Hall",   [new Space(0, "General", randomCongestionValue(40))]),
    new Location(8, type.ACADEMIC.unicode, "Thwing",                [new Space(0, "General", randomCongestionValue(10))]),
    new Location(9, type.ACADEMIC.unicode, "Tinkham Veale",         [new Space(0, "General", randomCongestionValue(22))])
  ]
}





router.get('/', function(req, res) {
  res.render('index', { title: 'CWRUded', locations: randomLocationArray() });
});

router.get('/api/locations', function(req, res) {
  res.status(200).json({ locations: randomLocationArray() });
});

module.exports = router;
