var pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DATABASE_URL) {
    console.log("Local db connection string not set!")
    process.exit(-1);
}
else
    console.log("Connection String: " + process.env.DATABASE_URL);

var conString = process.env.DATABASE_URL;
var client = new pg.Client(conString);
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
            id UUID PRIMARY KEY,
            location_name VARCHAR(128) NOT NULL,
            location_type INTEGER NOT NULL,
            extent INTEGER NOT NULL,
            last_updated TIMESTAMP
        );
    `;
    client.query(queryText, function(err, result) {
        if(err) {
            console.error('Error running create table query...', err);
            process.exit(-1);
        }

        console.log(result);
        client.end();
        process.exit(0);
  });
});