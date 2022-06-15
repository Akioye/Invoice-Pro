const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
 email: String
});

module.exports = new mongoose.model('Subscriber', subscriberSchema)