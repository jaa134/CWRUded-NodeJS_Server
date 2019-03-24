var express = require('express');
var router = express.Router();

const type = {
  ACADEMIC: 'academic',
  DINING: 'dining',
  GYM: 'gym'
}

class Space {
  constructor(id, name, congestionRating) {
    this.id = id
    this.name = name;
    this.congestionRating = congestionRating;
  }
}

class Location {
  constructor(id, type, name, spaces, latitude, longitude) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.spaces = spaces;
    this.latitude = latitude;
    this.longitude = longitude;
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

  var locations =  [
    new Location(0, type.ACADEMIC, "Kelvin Smith Library",  spacesKSL,                                            41.507336, -81.609616),
    new Location(1, type.ACADEMIC, "Olin Building",         [new Space(0, "General", randomCongestionValue(12))], 41.502121, -81.607890),
    new Location(2, type.GYM,      "Veale Athletic Center", [new Space(0, "General", randomCongestionValue(54))], 41.500991, -81.606196),
    new Location(3, type.DINING,   "Fribley Dining Hall",   [new Space(0, "General", randomCongestionValue(76))], 41.501051, -81.602680),
    new Location(4, type.ACADEMIC, "Nord Hall",             [new Space(0, "General", randomCongestionValue(32))], 41.502529, -81.607873),
    new Location(5, type.ACADEMIC, "Strosacker Auditorium", [new Space(0, "General", randomCongestionValue(21))], 41.503242, -81.607407),
    new Location(6, type.GYM,      "Wyant Athletic Center", [new Space(0, "General", randomCongestionValue(93))], 41.514078, -81.603269),
    new Location(7, type.DINING,   "Leutner Dining Hall",   [new Space(0, "General", randomCongestionValue(40))], 41.513459, -81.605994),
    new Location(8, type.ACADEMIC, "Thwing Center",         [new Space(0, "General", randomCongestionValue(10))], 41.507274, -81.608238),
    new Location(9, type.ACADEMIC, "Tinkham Veale",         [new Space(0, "General", randomCongestionValue(22))], 41.508091, -81.608659)
  ]

  function sortByName(a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase(); 
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
  }

  return locations.sort(sortByName);
}





router.get('/', function(req, res) {
  res.render('index', { title: 'CWRUded' });
});

router.get('/api/locations', function(req, res) {
  res.status(200).json(randomLocationArray());
});

module.exports = router;
