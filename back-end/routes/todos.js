const express = require('express')
const router = express.Router()

const TodoList = require('../models/todoList')
const TodoListItem = require('../models/todoListItem')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/getAllLists', async (req, res) => {
  try {
    const todoLists = await TodoList.find()
    res.json(todoLists)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/createList', async (req, res) => {
  const todoList = new TodoList({
    name: req.body.name,
  })

  try {
    const newTodoList = await todoList.save()
    res.status(201).json(newTodoList)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/createTodoItem/:id', getTodoList, async (req, res) => {
  const todoListItem = new TodoListItem({
    itemString: req.body.itemString,
    completed: false,
    listId: req.params.id
  })

  try {
    // res.todoList.listItems.push(todoListItem)
    // let updatedTodoList = await res.todoList.save()
    const newTodoItem = await todoListItem.save()
    res.status(201).json(newTodoItem)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.patch('/editTodoList/:id', getTodoList, async (req, res) => {
  if (req.body.name != null) {
    res.todoList.name = req.body.name
  }
  try {
    const updatedTodoList = await res.todoList.save()
    res.json(updatedTodoList)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.patch('/editTodoItem/:id/', async (req, res) => {
  TodoListItem.findByIdAndUpdate(req.params.id, req.body,
    function (err, todo) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated todo: ", todo);
      }
    });
  // try {
  //   todoListItem = await TodoListItem.findByIdAndUpdate(req.params.id, { completed: true })
  //   res.json(todoListItem)
  // } catch (error) {
  //   res.status(400).json({ message: error.message })
  // }
})

router.delete('/deleteTodoList/:id', getTodoList, async (req, res) => {
  try {
    await res.todoList.remove()
    res.json({ message: 'Deleted todo list' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function getTodoList(req, res, next) {
  let todoList
  try {
    todoList = await TodoList.findById(req.params.id)
    if (todoList == null) {
      return res.status(404).json({ message: 'Cannot find todo list' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.todoList = todoList
  next()
}

router.delete('/deleteTodoListItem/:id', async (req, res) => {

  try {
    TodoListItem.findByIdAndDelete(req.params.id, function (err, todo) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Deleted : ", todo);
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})


module.exports = router