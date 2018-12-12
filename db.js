var pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    resetConnection: resetConnection,
    getAllLocations: getAllLocations,
    updateLocation: updateLocation
};

var conString = process.env.DATABASE_URL;
if (!conString) {
    console.log("Local db connection string not set!")
    process.exit(-1);
}
else
    console.log("Connection String: " + conString);

var client = new pg.Client(conString);

function resetConnection() {
    client.connect(function(err) {
        if(err) {
            console.error('Could not connect to postgres...', err);
            process.exit(-1);
        }
    
        const queryText =
        `
        DROP TABLE IF EXISTS business;
    
        CREATE TABLE IF NOT EXISTS
            business(
                location_name VARCHAR(128) PRIMARY KEY,
                location_type INTEGER NOT NULL,
                extent INTEGER NOT NULL,
                last_updated TIMESTAMP
            );
    
        INSERT INTO business(location_name, location_type, extent, last_updated)
        VALUES 
            ('Home', 0, 0, NOW());
        `;
        client.query(queryText, function(err, result) {
            if(err) {
                console.error('Error running create table query...', err);
                process.exit(-1);
            }
    
            console.log(result);
        });
    });
}

function getAllLocations(cb) {
    client.query('select * from business', function(err, result) {
        if(err) {
            console.error('Error fetching locations...', err);
            cb(false);
        }
        else {
            cb(result['rows']);
        }
    });
}

function updateLocation() {
}
  