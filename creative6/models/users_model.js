var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    hashed_password: String,
    
    petName: String,
    gender: String,
    breed: String,
    species: String,
    color: String,
    age: String,
    

    vetName: String,
    clinicName: String,
    addressLine1: String,
    addressLine2: String,
    contact: String,
    lastVisit: String,
    notes: String,
    
    vaccine1: String,
    vaccineDate1: String,
    vaccine2: String,  
    vaccineDate2: String,
    vaccine3: String, 
    vaccineDate3: String,
    vaccine4: String,
    vaccineDate4: String,
    vaccine5: String, 
    vaccineDate5: String,
    vaccine6: String,  
    vaccineDate6: String
});
mongoose.model('User', UserSchema);
