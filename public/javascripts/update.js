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
    $('.timestamp').text(new Date().toLocaleString());
    locations.forEach(function (locationJSON) {
        var location = new Location(locationJSON);
        var $row = $('#' + location.name.toLowerCase());
        $row.find('.icon').text(location.icon);
        $row.find('.name').text(location.name);
        //$row.find('.congestion-rating').text(location.congestionRating);
    });
}

getUpdate();