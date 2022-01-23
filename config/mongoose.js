const mongoose = require('mongoose');
const env = require('./enviroment');
const dburl = env.db ;
// const dburl = `mongodb://localhost/${env.db}`;
mongoose.connect(dburl);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to db '));

db.once('open', function(){
    console.log(`Connected to MongoDB : ${env.db}`)
});

module.exports = db ;