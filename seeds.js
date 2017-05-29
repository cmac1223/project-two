var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-two');

var Restaurant = require("./models/restaurant");

//use native promises
mongoose.Promise = global.Promise;

Restaurant.remove({}, function(error){
    console.log(error);
});

var tassilisRawReality = new Restaurant({
    name: 'Tassilis Raw Reality',
    description: 'Atlanta Raw Vegan Cafe',
    phoneNumber:  '404-343-6126',
    items: [{name: "Souh of the Nile Wraps"}],
    img: "http://www.tassilisrawreality.com/uploads/2/7/6/4/27648779/2796283_orig.jpg"

});

var soulVegetarian = new Restaurant({
    name: 'Soul Vegetarian',
    description: 'Southern, meat-free menu (with gluten-free & vegan options) served in a casual storefront space.',
    phoneNumber:  '404-752-5194',
    items: [
        {name: "Herb Potatoes"},
        {name: "Garvey Burger"}
        ]
});

var herbanFix = new Restaurant({
    name: 'Herban Fix-Vegan Kitchen',
    description: 'Pan-Asian dishes using strictly vegan, Plant-based ingredients',
    phoneNumber: '404-815-8787',
    items: [
        {name: "Rainbow fried wild rice w/ walnuts & pine nuts"},
        {name: "Truffle widle rice topped with sautéed assorted mushrooms"}
        ]  
})

tassilisRawReality.save(function(error){
    if (error) {
        console.log(error);
        return;
    }

    console.log('saved tassilis')
});

soulVegetarian.save(function(error){
    if (error) {
        console.log(error);
        return;
    }

    

    console.log('saved soulVegetarian')
});

herbanFix.save(function(error){
    if (error) {
        console.log(error);
        return;
    }

    console.log('saved Heran Fix')
});

