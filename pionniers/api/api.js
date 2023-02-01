'use strict';

const app = require( 'express' )();
const path = require('path');
const sheet_scrapper = require('./sheet_scrapper');

app.get('/map', function ( req, res ) {
    sheet_scrapper.readJSONFromServerFile().then(data => {
        // Filter data to only keep convenient fields
        data.values = data.values.map(row => {
            return {
                "Id": row[0],
                "Long": row[2],
                "Lat": row[3],
                "Topic": row[11],
                "Keywords": row[12]
            }
        });
        // Remove header row
        data.values.shift();
        // Remove range and majorDimension fields
        delete data.range;
        delete data.majorDimension;
        // Send it as a JSON object
        res.json(data);
    });
});

// Sample endpoint that sends the partner's name
app.get('/topic', function ( req, res ) {
    let topic;

    // Get partner's topic from folder name
    topic = path.basename(path.join(__dirname, '/..'))
    // Send it as a JSON object
    res.json({'topic':topic});
} );

// Export our API
module.exports = app;
