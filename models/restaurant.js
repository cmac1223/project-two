var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.promise = global.Promise;

var RestaurantSchema = new Schema({
    name: String,
    description: String,
    phoneNumber: String
    //nested models??
});

RestaurantSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if (!this.created_at){
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);