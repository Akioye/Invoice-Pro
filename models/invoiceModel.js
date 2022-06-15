const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({

 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
 },

 invoiceNumber: String,

 companyLogo: String,
 
 from: {
     name: String,
     email: String,
     address: String, 
     phoneNumber: Number,
     businessNumber: Number,
     date: 'String'
 },
 
 to: {
    name: String,
    email: String,
    address: String, 
    phoneNumber: Number
},

status: {
     type: String, 
     enum: ['paid', 'pending'],
     default: 'pending'
 }, 

products:[
     {
         description: String,
         rate: Number, 
         quantity: Number,
         amount: Number
     }
 ], 

 sumTotal: Number, 

 client: String, 

 notes: String

});

module.exports = new mongoose.model('Invoice', invoiceSchema) 