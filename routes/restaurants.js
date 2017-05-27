var express = require('express');
var router = express.Router();

var Restaurant = require('../models/restaurant');



// USERS INDEX ROUTE
router.get('/', function (request, response) {

    // find all of the users
    Restaurant.find({})
        .exec(function (error, userList) {
            console.log(userList)
            


            if (error) {
                console.log("Error while retrieving restaurant: " + error);
                return;
            }

            // then pass the list of users to Handlebars to render
            response.render('restaurants/index', {
                restaurantList: userList
                
            });
        })
})


// USER CREATE FORM (NEW)
router.get('/new', function (request, response) {

    // simply render the new user form
    response.render('restaurants/new');
});



// user create route
router.post('/', function (request, response) {

    // grab the new user information from the form POST
    var newRestaurantForm = request.body;

    // then create a new User from the User model in your schema
    var user = new Restaurant({
        name: newRestaurantForm.name,
        description: newRestaurantForm.description,
        phoneNumber: newRestaurantForm.phoneNumber
    });


    // then save the new user to the database
    user.save(function (error, user) {
        if (error) {
            console.log(error);
            return;
        }
        
        // once the new user has been saved, redirect to the users index page
        response.redirect('/restaurants');
    });

});



// USER SHOW ROUTE
router.get('/:id', function (request, response) {

    // grab the ID of the user we want to show
    var userId = request.params.id;

    // then find the user in the database using the ID
    Restaurant.findById(userId)
        .exec(function (error, user) {

            if (error) {
                console.log("Error while retrieving user with ID of " + userId);
                console.log("Error message: " + error);
                return;
            }

            // once we've found the user, pass the user object to Handlebars to render
            response.render('restaurants/show', {
                restaurantList: userId,
                user: user
            });
        });

});



// USER EDIT ROUTE
router.get('/edit/:id', function (request, response) {

    // grab the ID of the user we want to edit from the parameters
    var userId = request.params.id;

    // then find the user we want to edit in the database, using the ID
    Restaurant.findById(userId)
        .exec(function (error, user) {

            if (error) {
                console.log("Error while retrieving user with ID of " + userId);
                console.log("Error message: " + error);
                return;
            }

            // once we have found the user, pass the user info to the
            // user edit form so we can pre-populate the form with existing data
            response.render('restaurants/edit', {
                user: user
            });
        });
});



// USER UPDATE ROUTE
router.put('/:id', function (request, response) {

    // grab the ID of the user we want to update from the parameters
    var userId = request.params.id;

    // then grab the edited user info from the form's PUT request
    var newUserInfo = request.body;

    // then find the user in the database, and update its info to
    // match what was updated in the form
    // (remember to pass { new: true })
    User.findByIdAndUpdate(userId, newUserInfo, { new: true })
        .exec(function (error, user) {

            if (error) {
                console.log("Error while updating User with ID of " + userId);
                return;
            }

            // once we have found the user and updated it, redirect to 
            // that user's show route
            response.redirect('/restaurants/' + userId);

        });

});




module.exports = router;