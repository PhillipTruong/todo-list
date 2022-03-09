const mongoose = require('mongoose')

const todoListItemSchema = new mongoose.Schema({
  itemString: {
    type: String,
    required: true
  },
  completed: Boolean
})

module.exports = mongoose.model('TodoListItem', todoListItemSchema)
