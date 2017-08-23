const mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}]
  // status: String,
  // email: String,
  // rating: Number
}))