console.log('update script retrieved...');

var update = function () {
    setTimeout(function(){ 
        $.ajax({
            url: 'api/locations'
        }).fail(function() {
            console.log('request failed');
        }).done(function(data) {
            console.log(data);
        }).always(function(data) {
            update();
        });
    }, 3000);
};
update();