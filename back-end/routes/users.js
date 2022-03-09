const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/createUser', async (req, res) => {
  const user = new User({
    name: req.body.name,
    todoLists: []
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router