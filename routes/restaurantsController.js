var express = require('express');
var router = express.Router();

// var Restaurant = require('../models/restaurant');
var Restaurant = require('../models/restaurant');
var Item = require("../models/item")



// USERS INDEX ROUTE
router.get('/', function (request, response) {

    // find all of the users
    Restaurant.find({})
        .exec(function (error, restaurantList) {
            console.log(restaurantList)
            


            if (error) {
                console.log("Error while retrieving restaurant: " + error);
                return;
            }

            // then pass the list of users to Handlebars to render
            response.render('restaurants/index', {
                restaurantList: restaurantList
                
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
        phoneNumber: newRestaurantForm.phoneNumber,
       
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
    Restaurant.findByIdAndUpdate(userId, newUserInfo, { new: true })
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

//user delete
router.get('/delete/:id', function(request, response){
    
    // assign the id parameters to a variable 
    var userId = request.params.id;

    // then find and delete the user, using the id
    Restaurant.findByIdAndRemove(userId)
    .exec(function (error, user){

        if (error) {
            console.log("Error while deleting User with ID of " + userId)
            return;
        }

        // redirect back to unser index once user has been deleted
        response.redirect('/restaurants');
    })
});

// SHOW NEW ITEM FORM
router.get('/:userId/items/new', function (request, response) {

    // grab the ID of the user we want to create a new item for
    var userId = request.params.userId;

    // then render the new item form, passing along the user ID to the form
    response.render('items/new', {
        userId: userId
    })
});

// ADD A NEW ITEM
router.post('/:userId/items', function (request, response) {

    // grab the user ID we want to create a new item for
    var userId = request.params.userId;

    // then grab the new Item that we created using the form
    var newItemName = request.body.name;

    // Find the User in the database we want to save the new Item for
    Restaurant.findById(userId)
        .exec(function (err, user) {

            // add a new Item to the User's list of items, using the data
            // we grabbed off of the form
            user.items.push(new Item({ name: newItemName }));

            // once we have added the new Item to the user's collection 
            // of items, we can save the user
            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                // once the user has been saved, we can redirect back 
                // to the User's show page, and we should see the new item
                response.redirect('/restaurants/' + userId);
            })
        });
});

//remove an item
router.get('/:userId/items/:itemId/delete', function (request, response){
    //grab the ID of the user we would like to delete an item for
    var userId = request.params.userId;

    //grab the ID of the Item we would like to delete for the User Id above
    var itemId = request.params.itemId;

    // use Mongoose to find the User by its ID and delete the Item
    // that matches our Item ID
    Restaurant.findByIdAndUpdate(userId, {
        $pull: {
            items: { _id: itemId }
        }
    })
        .exec(function (error, item){
            if (error) {
                console.log("Error while trying to delete item :" + error);
                return;
            }

            // once we have deleted the item, redirect to the user's show page
            response.redirect('/restaurants/' + userId);
        })
});

//show the item edit form
router.get('/:userId/items/:itemId/edit', function (request, response){
    //grab the ID of the user whose Item would like to edit
    var userId = request.params.userId;

    //then grab the ID of the Item we would like to edit for the User above
    var itemId = request.params.itemId;

    //find the User by ID
    Restaurant.findById(userId)
        .exec(function (error, user){
            //once we have found the Restaurant, find the Item in its' array
            //of items that matches the Item ID above
            var itemToEdit = user.items.find(function (item){
                return item.id === itemId;
            })

            //Once we have found the item we would like edit, render the
            //Item edit form with all of the information we would like to put
            //into the form
            response.render('items/edit', {
                userId: userId,
                itemId: itemId,
                itemToEdit: itemToEdit
            })
        })
})

//edit an item
router.put('/:userId/items/:itemId', function (request, response){
    //find the ID of the user we would like to edit
    var userId = request.params.userId;
    //find the Id of the Item we would like to edit for the User above
    var itemId = request.params.itemId;
    //grab the edited information about the Item from the form
    var editedItemForm = request.body;

    //find the User by ID
    Restaurant.findById(userId)
        .exec(function (error, user){
            //once we have found the Restaurant, find the Item in the restaurant's
            //collection of Items that matches our Item ID above
            var itemToEdit = user.items.find(function (item){
                return item.id === itemId;
            })

            //update the item we would like to edit with the new 
            //information from the form
            itemToEdit.name = editedItemForm.name;

            //once we have edited the Item, save the user to the database
            user.save(function (error, user){
                //once we have saved the restaurant with its edited Item, redirect
                //to the show page for that Restaurant. we should see the Item
                // information updated.
                response.redirect('/restaurants/' + userId)
            });
        });
});







module.exports = router;