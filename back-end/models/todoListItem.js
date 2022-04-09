const mongoose = require('mongoose')

const todoListItemSchema = new mongoose.Schema({
  itemString: {
    type: String,
    required: true
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  completed: Boolean
})

module.exports = mongoose.model('TodoListItem', todoListItemSchema)
