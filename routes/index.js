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
    new Space(0, "Basement",  randomCongestionValue(23)),
    new Space(0, "1st Floor", randomCongestionValue(78)),
    new Space(1, "2nd Floor", randomCongestionValue(88)),
    new Space(2, "3rd Floor", randomCongestionValue(65))
  ]

  var spacesVeale = [
    new Space(0, "Weight Room", randomCongestionValue(67)),
    new Space(1, "Cardio Room", randomCongestionValue(88)),
    new Space(2, "Track",       randomCongestionValue(34))
  ]

  var spacesWyant = [
    new Space(0, "Weight Room", randomCongestionValue(67)),
    new Space(1, "Cardio Room", randomCongestionValue(88))
  ]

  var spacesGlennan = [
    new Space(0, "Circuits Lab", randomCongestionValue(23)),
    new Space(1, "Other", randomCongestionValue(32))
  ]

  var spacesTomlinson = [
    new Space(0, "Cafeteria", randomCongestionValue(93)),
    new Space(1, "Other", randomCongestionValue(34))
  ]

  var spacesAllenMemorial = [
    new Space(0, "Library", randomCongestionValue(37)),
    new Space(1, "Ford Auditorium", randomCongestionValue(76))
  ]

  var spacesThinkBox = [
    new Space(0, "1st Floor", randomCongestionValue(23)),
    new Space(1, "2nd Floor", randomCongestionValue(10)),
    new Space(2, "3rd Floor", randomCongestionValue(32)),
    new Space(3, "4th Floor", randomCongestionValue(22)),
    new Space(4, "5th Floor", randomCongestionValue(43)),
    new Space(5, "6th Floor", randomCongestionValue(77)),
    new Space(6, "7th Floor", randomCongestionValue(32)),
    new Space(7, "8th Floor", randomCongestionValue(10))
  ]

  var spacesMillis = [
    new Space(0, "Schmitt Auditorium", randomCongestionValue(80)),
    new Space(1, "Other", randomCongestionValue(37))
  ]

  var locations =  [
    new Location(0,  type.ACADEMIC, "Kelvin Smith Library",    spacesKSL,                                            41.507336, -81.609616),
    new Location(1,  type.GYM,      "Veale Athletic Center",   spacesVeale                                         , 41.500991, -81.606196),
    new Location(2,  type.GYM,      "Wyant Athletic Center",   spacesWyant                                         , 41.514078, -81.603269),
    new Location(3,  type.ACADEMIC, "Glennan Building",        spacesGlennan                                       , 41.501497, -81.607216),
    new Location(4,  type.DINING,   "Tomlinson Hall",          spacesTomlinson                                     , 41.504047, -81.609620),
    new Location(5,  type.ACADEMIC, "Allen Memorial Library",  spacesAllenMemorial                                 , 41.505925, -81.608473),
    new Location(6,  type.ACADEMIC, "Sears think[box]",        spacesThinkBox                                      , 41.500560, -81.605671),
    new Location(7,  type.ACADEMIC, "Millis Hall",             spacesMillis                                        , 41.503981, -81.607245),
    new Location(8,  type.ACADEMIC, "Olin Building",           [new Space(0, "General", randomCongestionValue(12))], 41.502121, -81.607890),
    new Location(9,  type.DINING,   "Fribley Dining Hall",     [new Space(0, "General", randomCongestionValue(76))], 41.501051, -81.602680),
    new Location(10, type.ACADEMIC, "Nord Hall",               [new Space(0, "General", randomCongestionValue(32))], 41.502529, -81.607873),
    new Location(11, type.ACADEMIC, "Strosacker Auditorium",   [new Space(0, "General", randomCongestionValue(21))], 41.503242, -81.607407),
    new Location(12, type.DINING,   "Leutner Dining Hall",     [new Space(0, "General", randomCongestionValue(40))], 41.513459, -81.605994),
    new Location(13, type.ACADEMIC, "Thwing Center",           [new Space(0, "General", randomCongestionValue(10))], 41.507274, -81.608238),
    new Location(14, type.DINING,   "Tinkham Veale",           [new Space(0, "General", randomCongestionValue(22))], 41.508091, -81.608659),
    new Location(15, type.DINING,   "The DEN by Denny's",      [new Space(0, "General", randomCongestionValue(51))], 41.512005, -81.606061),
    new Location(16, type.ACADEMIC, "Peter B. Lewis Building", [new Space(0, "General", randomCongestionValue(88))], 41.509895, -81.607980),
    new Location(17, type.ACADEMIC, "Bingham Building",        [new Space(0, "General", randomCongestionValue(33))], 41.502364, -81.606878),
    new Location(18, type.ACADEMIC, "Carlton Commons",         [new Space(0, "General", randomCongestionValue(10))], 41.500161, -81.601842),
    new Location(19, type.ACADEMIC, "Crawford Hall",           [new Space(0, "General", randomCongestionValue(28))], 41.504559, -81.609820),
    new Location(20, type.ACADEMIC, "Yost Hall",               [new Space(0, "General", randomCongestionValue(78))], 41.503604, -81.608969),
    new Location(21, type.ACADEMIC, "Haydn Hall",              [new Space(0, "General", randomCongestionValue(10))], 41.508620, -81.607681),
    new Location(22, type.ACADEMIC, "Rockefeller Building",    [new Space(0, "General", randomCongestionValue(65))], 41.503632, -81.607824),
    new Location(23, type.ACADEMIC, "White Building",          [new Space(0, "General", randomCongestionValue(34))], 41.501936, -81.607477),
    new Location(24, type.ACADEMIC, "Wickenden Building",      [new Space(0, "General", randomCongestionValue(23))], 41.503065, -81.608368),
    new Location(25, type.ACADEMIC, "Sears Building",          [new Space(0, "General", randomCongestionValue(45))], 41.502775, -81.608057),
    new Location(26, type.ACADEMIC, "Smith Building",          [new Space(0, "General", randomCongestionValue(78))], 41.502919, -81.606883),
    new Location(27, type.ACADEMIC, "Mandel School",           [new Space(0, "General", randomCongestionValue(34))], 41.510659, -81.607099),
    new Location(28, type.ACADEMIC, "Writing Resource Center", [new Space(0, "General", randomCongestionValue(65))], 41.511908, -81.605161),
    new Location(29, type.ACADEMIC, "DeGrace Hall",            [new Space(0, "General", randomCongestionValue(23))], 41.504162, -81.607116),
    new Location(30, type.ACADEMIC, "Clapp Hall",              [new Space(0, "General", randomCongestionValue(23))], 41.503952, -81.606707)
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
