const mongoose = require('mongoose')

module.exports = mongoose.model('Listing', new mongoose.Schema({
  userid: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  username: {type: String},
  title: String,
  by: [String],
  tag: [String],
  price: Number
  // date: Date,
  // series: String,
  // description: String,
  // condition: String,
  // status: String
}))
