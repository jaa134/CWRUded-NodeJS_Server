class Rating {
    constructor(value, createdOn) {
        this.value = value;
        this.createdOn = new Date()
    }
}

class Space {
    constructor(name, history) {
        this.name = name;

        var self = this;
        self.history = "";
        history.reverse().forEach(function (data) {
            self.history += data.value + "&nbsp;&nbsp;";
        });
    }
}
  
class Location {
    constructor(type, name, spaces) {
        this.type = type;
        this.name = name;

        var self = this;
        self.spaces = [];
        spaces.forEach(function (data) {
            self.spaces.push(new Space(data.name, data.history));
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
    }, 5000);
};

var updateLocations = function(locationsData) {
    $('.timestamp').text(new Date().toLocaleString());

    var locations = [];
    locationsData.forEach(function (data) {
        locations.push(new Location(data.type, data.name, data.spaces));
    });

    var list = ''
    locations.forEach(function (location) {
        list += 
            `<li>` +
                `<div>` +
                    `<span class="fa icon ${location.type}"></span>` +
                    `<span class="name"><strong>${location.name}</strong></span>`;

        location.spaces.forEach(function (space) {
            list += `<div>` + 
                        `<div style="float: left; width:200px">${space.name}</div>` + 
                        `<span>${space.history}</span>` + 
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