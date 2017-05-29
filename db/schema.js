var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.promise = global.Promise;

var ItemSchema = new Schema({
    name: String
   
});

var RestaurantSchema = new Schema({
    name: String,
    description: String,
    phoneNumber: String,
    items: [ItemSchema],
    img: String
});

RestaurantSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if (!this.created_at){
        this.created_at = now;
    }
    next();
});


var RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
var ItemModel = mongoose.model("Item", ItemSchema);

module.exports = {
  Restaurant: RestaurantModel,
  Item: ItemModel
};