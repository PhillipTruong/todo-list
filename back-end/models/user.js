const mongoose = require('mongoose')
const TodoListSchema = require('./todoList').schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  todoLists: [TodoListSchema]
})

module.exports = mongoose.model('User', userSchema)