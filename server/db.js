const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

const Task = mongoose.model('Task', schema)

module.exports = { Task }
