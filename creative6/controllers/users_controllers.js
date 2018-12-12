var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.signup = function(req, res){
  console.log("Begin exports.signup");
  var user = new User({username:req.body.username});
  console.log("after new user exports.signup");
  user.set('hashed_password', hashPW(req.body.password));
  console.log("after hashing user exports.signup");
  user.set('email', req.body.email);
  console.log("after email user exports.signup");
  user.save(function(err) {
    console.log("In exports.signup");
    console.log(err);
    if (err){
      res.session.error = err;
      res.redirect('/signup');
    } else {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = 'You are logged in as ' + user.username;
      res.redirect('/');
    }
  });
};
exports.login = function(req, res){
  User.findOne({ username: req.body.username })
  .exec(function(err, user) {
    if (!user){
      err = 'User Not Found.';
    } else if (user.hashed_password ===
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        console.log("login");
        console.log(user);
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = 'You are logged in as ' + user.username + '. (Please "Edit Pet Profile to Begin)';
        req.session.petName = user.petName;
        req.session.gender = user.gender;
        req.session.species = user.species;
        req.session.breed = user.breed;
        req.session.color = user.color;
        req.session.petName = user.age;
        
        req.session.vetName = user.vetName;
        req.session.clinicName = user.clinicName;
        req.session.addressLine1 = user.addressLine1;
        req.session.addressLine2 = user.addressLine2;
        req.session.contact = user.contact;
        req.session.lastVisit = user.lastVisit;
        req.session.notes = user.notes;
        
        req.session.vaccine1 = user.vaccine1;
        req.session.vaccineDate1 = user.vaccineDate1;
        req.session.vaccine2 = user.vaccine2;
        req.session.vaccineDate2 = user.vaccineDate2;
        req.session.vaccine3 = user.vaccine3;
        req.session.vaccineDate3 = user.vaccineDate3;
        req.session.vaccine4 = user.vaccine4;
        req.session.vaccineDate4 = user.vaccineDate4;
        req.session.vaccine5 = user.vaccine5;
        req.session.vaccineDate5 = user.vaccineDate5;
        req.session.vaccine6 = user.vaccine6;
        req.session.vaccineDate6 = user.vaccineDate6;
        res.redirect('/');
      });
    }else{
      err = 'Authentication failed.';
    }
    if(err){
      req.session.regenerate(function(){
        req.session.msg = err;
        res.redirect('/login');
      });
    }
  });
};
exports.getUserProfile = function(req, res) {
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if (!user){
      res.json(404, {err: 'User Not Found.'});
    } else {
      res.json(user);
    }
  });
};
exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    user.set('email', req.body.email);
    user.set('petName', req.body.petName);
    user.set('gender', req.body.gender);
    user.set('species', req.body.species);
    user.set('breed', req.body.breed);
    user.set('color', req.body.color);
    user.set('age', req.body.age);
  
    user.set('vetName', req.body.vetName);
    user.set('clinicName', req.body.clinicName);
    user.set('addressLine1', req.body.addressLine1);
    user.set('addressLine2', req.body.addressLine2);
    user.set('contact', req.body.contact);
    user.set('lastVisit', req.body.lastVisit);
    user.set('notes', req.body.notes);
    
    user.set('vaccine1', req.body.vaccine1);
    user.set('vaccineDate1', req.body.vaccineDate1);
    user.set('vaccine2', req.body.vaccine2);
    user.set('vaccineDate2', req.body.vaccineDate2);
    user.set('vaccine3', req.body.vaccine3);
    user.set('vaccineDate3', req.body.vaccineDate3);
    user.set('vaccine4', req.body.vaccine4);
    user.set('vaccineDate4', req.body.vaccineDate4);
    user.set('vaccine5', req.body.vaccine5);
    user.set('vaccineDate5', req.body.vaccineDate5);
    user.set('vaccine6', req.body.vaccine6);
    user.set('vaccineDate6', req.body.vaccineDate6);
    user.save(function(err) {
      if (err){
        res.sessor.error = err;
      } else {
        req.session.msg = ' User Updated.';
        req.session.petName = req.body.petName;
        req.session.gender = req.body.gender;
        req.session.species = req.body.species;
        req.session.breed = req.body.breed;
        req.session.color = req.body.color;
        req.session.age = req.body.age;
        req.session.vaccines = req.body.vaccines;
        
        req.session.vetName = user.vetName;
        req.session.clinicName = user.clinicName;
        req.session.addressLine1 = user.addressLine1;
        req.session.addressLine2 = user.addressLine2;
        req.session.contact = user.contact;
        req.session.lastVisit = user.lastVisit;
        req.session.notes = user.notes;
        
        req.session.vaccine1 = user.vaccine1;
        req.session.vaccineDate1 = user.vaccineDate1;
        req.session.vaccine2 = user.vaccine2;
        req.session.vaccineDate2 = user.vaccineDate2;
        req.session.vaccine3 = user.vaccine3;
        req.session.vaccineDate3 = user.vaccineDate3;
        req.session.vaccine4 = user.vaccine4;
        req.session.vaccineDate4 = user.vaccineDate4;
        req.session.vaccine5 = user.vaccine5;
        req.session.vaccineDate5 = user.vaccineDate5;
        req.session.vaccine6 = user.vaccine6;
        req.session.vaccineDate6 = user.vaccineDate6
      }
      res.redirect('/user');
    });
  });
};
exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if(user){
      user.remove(function(err){
        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    } else{
      req.session.msg = "User Not Found!";
      req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};
