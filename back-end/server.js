require('dotenv').config()
const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('connected to database'))

app.use(express.json())

app.use(cors())
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const todoRouter = require('./routes/todos')
app.use('/todos', todoRouter)

app.listen(3001, function () {
  console.log('todo backend listening on port 3001!')
});