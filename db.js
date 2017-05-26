var mongoose = require('mongoose');

var db = mongoose.connection;

mongoose.promise = global.Promise;

//connection events
db.once('open', function(){
    console.log("Opened mongoose.");
});

db.once('close', function(){
    console.log("Closed mongoose.");
});

db.on('connected', function(){
    console.log('Mongoose connected to ' + db.host + ':' + db.port + '/' + db.name);
});

db.on('error', function(error){
    console.log('Mongoose connected error: ' + error);
});

db.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

module.exports = db;