require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('connected to database'))

app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const todoRouter = require('./routes/todos')
app.use('/todos', todoRouter)

app.listen(3001, function () {
  console.log('todo backend listening on port 3001!')
});