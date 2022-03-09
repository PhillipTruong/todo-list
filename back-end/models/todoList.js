const mongoose = require('mongoose')
const todoListItemSchema = require('./todoListItem')

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  listItems: [todoListItemSchema]
})

module.exports = mongoose.model('TodoList', todoListSchema)