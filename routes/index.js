var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response) {
  response.redirect('/restaurants');
});

module.exports = router;
