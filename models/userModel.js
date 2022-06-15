const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name: String,
 email: String,
 password: String, 
 confirmPassword: String, 

settings: {
   companyName: String,
   companyEmail: String,
   companyLogo: String, 
   companyAddress: String, 
   companyPhoneNumber: Number, 
   companyBusinessNumber: Number, 
}

});   

module.exports = new mongoose.model('User', userSchema)