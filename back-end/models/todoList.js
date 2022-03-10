const mongoose = require('mongoose')
// const todoListItemSchema = require('./todoListItem').schema

const todoListItemSchema = new mongoose.Schema({
  itemString: {
    type: String,
    required: true
  },
  completed: Boolean
})

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  listItems: [todoListItemSchema]
})

module.exports = mongoose.model('TodoList', todoListSchema)