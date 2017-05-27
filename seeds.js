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

var tassilisrawReality = new Restaurant({
    name: 'Tassilis Raw Reality',
    description: 'Atlanta Raw Vegan Cafe',
    phoneNumber:  '404-93fr-6126'
});

tassilisRawReality.save(function(error){
    if (error) {
        console.log(error);
        return;
    }

    console.log('saved tassilis')
})

tassilisrawReality.save(function(error){
    if (error) {
        console.log(error);
        return;
    }

    console.log('saved tassilis')
})

