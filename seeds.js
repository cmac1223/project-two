var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-two');

var Restaurant = require("./models/restaurant");

Restaurant.remove({}, function(error){
    console.log(error);
});

var tassilisRawReality = new Restaurant({
    name: 'Tassilis Raw Reality',
    description: 'Atlanta Raw Vegan Cafe',
    phoneNumber:  '404-343-6126'
});

tassilisRawReality.save(function(error){
    if (error) {
        console.log(error);
        return;
    }
    console.log('saved tassilis')
})
