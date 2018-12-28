var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/restaurantDB',{ useNewUrlParser: true }); //Connects to a mongo database called "restaurantDB"

var restaurantSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Address: String,
    ImageURL: String,
    upVotes: {type: Number, default:0},
    downVotes: {type: Number, default:0}
});

restaurantSchema.methods.upvote = function(cb) {
  this.upVotes += 1;
  this.save(cb);
};

restaurantSchema.methods.downvote = function(cb) {
  this.downVotes += 1;
  this.save(cb);
};

var Restaurant = mongoose.model('Restaurant', restaurantSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


router.param('restaurant', function(req, res, next, id) {
  var query = Restaurant.findById(id);
  query.exec(function (err, restaurant){
    if (err) { return next(err); }
    if (!restaurant) { return next(new Error("can't find restaurant")); }
    req.restaurant = restaurant;
    return next();
  });
});

router.get('/restaurants/:restaurant',function(req,res) {
  res.json(req.restaurant);
});

router.put('/restaurants/:restaurant/upvote', function(req, res, next) {
  console.log("Put Route"+req.restaurant.Name);
  req.restaurant.upvote(function(err, restaurant){
    if (err) { return next(err); }
    res.json(restaurant);
  });
});

router.put('/restaurants/:restaurant/downvote', function(req, res, next) {
  console.log("Put Route"+req.restaurant.Name);
  req.restaurant.downvote(function(err, restaurant){
    if (err) { return next(err); }
    res.json(restaurant);
  });
});

router.delete('/restaurants/:restaurant',function(req,res) {
  req.restaurant.remove();
  res.sendStatus(200);
});

router.get('/restaurants', function(req, res, next) {
  console.log("Get Route");
  Restaurant.find(function(err, restaurant){
    if(err){ console.log("Error"); return next(err); }
    res.json(restaurant);
  console.log("res.json Get Route");
  });
  console.log("returning Get Route");
});

router.post('/restaurants', function(req, res, next) {
  console.log("Post Route");
  var restaurant = new Restaurant(req.body);
  console.log("Post Route");
  console.log(restaurant);
  restaurant.save(function(err, restaurant){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(restaurant);
	});
});

module.exports = router;

