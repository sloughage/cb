const mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
  listings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
  // status: String,
  // email: String,
  // rating: Number
}))