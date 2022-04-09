const mongoose = require('mongoose')

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('TodoList', todoListSchema)