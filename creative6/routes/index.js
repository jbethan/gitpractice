var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                        msg:req.session.msg,
                        petName:req.session.petName,
                        gender: req.session.gender,
                        species:req.session.species,
                        breed:req.session.breed,
                        color:req.session.color,
                        age:req.session.age, 
                        
                        vetName:req.session.vetName, 
                        clinicName:req.session.clinicName,
                        addressLine1:req.session.addressLine1,
                        addressLine2:req.session.addressLine2,
                        contact:req.session.contact,
                        lastVisit:req.session.lastVisit,
                        notes:req.session.notes,
                        
                        vaccine1:req.session.vaccine1,
                        vaccineDate1:req.session.vaccineDate1,
                        vaccine2:req.session.vaccine2,
                        vaccineDate2:req.session.vaccineDate2,
                        vaccine3:req.session.vaccine3,
                        vaccineDate3:req.session.vaccineDate3,
                        vaccine4:req.session.vaccine4,
                        vaccineDate4:req.session.vaccineDate4,
                        vaccine5:req.session.vaccine5,
                        vaccineDate5:req.session.vaccineDate5,
                        vaccine6:req.session.vaccine6,  
                        vaccineDate6:req.session.vaccineDate6,});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;
