var express = require('express');
var router = express.Router();

var Restaurant = require('../models/restaurant');

//index authors
router.get('/', function(request, response){
    response.send('restaurants coming soon');
});

module.exports = router;