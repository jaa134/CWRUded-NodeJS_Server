var pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    resetConnection: resetConnection,
    getLocations: getLocations,
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
    
        const queryText = `
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
                ('Home', 0, 0, NOW() AT TIME ZONE 'EST');
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

class Location {
    constructor(data) {
      this.name = data.location_name;
      this.extent = data.extent;
    };

    isValid() {
        return this.name && this.extent;
    };
}

function getLocations(cb) {
    const queryText = `
        SELECT *, TO_CHAR(last_updated, 'MON DD, hh:mmam') as formatted_date
        FROM business;
    `;
    client.query(queryText, function(err, result) {
        if(err) {
            console.error('Error fetching locations...', err);
            cb(false);
        }
        else {
            console.log(result['rows'])
            cb(result['rows']);
        }
    });
}

function updateLocation(data, cb) {
    var location = new Location(data);

    if (!location.isValid()) {
        cb (false);
        return;
    }

    const queryText = `
        UPDATE business
        SET extent = ${location.extent},
            last_updated = NOW() AT TIME ZONE 'EST'
        WHERE
            location_name = '${location.name}';
    `;
    client.query(queryText, function(err, result) {
        if(err) {
            console.error('Error updating locations...', err);
            cb(false);
        }
        else {
            cb(true);
        }
    });
}
  