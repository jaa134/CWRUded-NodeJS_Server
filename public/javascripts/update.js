class Location {
  constructor(data) {
    this.name = data.location_name;
    this.type = data.location_type;
    this.extent = data.extent;
    this.timestamp = data.last_updated;
  }
}

var getUpdate = function () {
    console.log('updating...')
    setTimeout(function(){ 
        $.ajax({
            url: 'api/locations'
        }).fail(function() {
            console.error('request failed');
        }).done(function(data) {
            updateLocations(data.locations);
        }).always(function(data) {
            getUpdate();
        });
    }, 3000);
};

var updateLocations = function(locations) {
    locations.forEach(function (locationJSON) {
        var location = new Location(locationJSON);
        var $row = $('#' + location.name.toLowerCase());
        $row.children('.name').text(location.name);
        $row.children('.type').text(location.type);
        $row.children('.extent').text(location.extent);
        $row.children('.timestamp').text(location.timestamp);
    });
}

getUpdate();