const mongoose = require('mongoose')
const todoListSchema = require('./todoList')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lists: [todoListSchema]
})

module.exports = mongoose.model('User', userSchema)