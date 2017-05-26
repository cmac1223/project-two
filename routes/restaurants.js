var express = require('express');
var router = express.Router();

var Restaurant = require('../models/restaurantController');

//index authors
router.get('/', function(request, response){
    response.send('restaurants coming soon');
});


// // USERS INDEX ROUTE
// router.get('/', function (request, response) {

//     // find all of the users
//     User.find({})
//         .exec(function (error, userList) {

//             if (error) {
//                 console.log("Error while retrieving users: " + error);
//                 return;
//             }

//             // then pass the list of users to Handlebars to render
//             response.render('users/index', {
//                 userList: userList
//             });
//         })
// })


module.exports = router;