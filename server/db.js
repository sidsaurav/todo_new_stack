const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

const User = mongoose.model('User', schema)

module.exports = { User }
