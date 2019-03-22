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

        this.spaces = [];
        var self = this;
        spaces.forEach(function (data) {
            self.spaces.push(new Space(data.id, data.name, data.congestionRating));
        });
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
            updateLocations(data);
        }).always(function(data) {
            getUpdate();
        });
    }, 3000);
};

var updateLocations = function(locationsData) {
    $('.timestamp').text(new Date().toLocaleString());

    var locations = [];
    locationsData.forEach(function (data) {
        locations.push(new Location(data.id, data.type, data.name, data.spaces));
    });

    var list = ''
    locations.forEach(function (location) {
        list += 
            `<li id="${location.id}">` +
                `<div>` +
                    `<span class="fa icon ${location.type}"></span>` +
                    `<span class="name"><strong>${location.name}</strong></span>`;

        location.spaces.forEach(function (space) {
            list += `<div>` + 
                        `<div style="float: left; width:100px">${space.name}</div>` + 
                        `<span>${space.congestionRating}</span>` + 
                    `</div>`;
        });

        list +=
                `</div>` +
                `</br>` +
            `</li>`;
    });
    $('#locations-list').html(list)
}

$('.timestamp').text(new Date().toLocaleString());
getUpdate();