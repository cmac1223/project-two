var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-two');

var Restaurant = require("./models/restaurant");

Restaurant.remove({}, function(error){
    console.log(error);
});

var tassilisRawReality = new Restaurant({
    name: 'Tassilis Raw Reality',
    description: 'Atlanta Raw Vegan Cafe',
    phone:  '404-343-6126'
})
