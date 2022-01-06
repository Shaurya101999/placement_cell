const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/placement_cell_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to db '));

db.once('open', function(){
    console.log(' Connected to MongoDB')
});

module.exports = db ;