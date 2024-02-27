const express = require('express')
const app = express()
const { addTodoPayload } = require('./types')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { User } = require('./db')
dotenv.config()

app.use(express.json())

const PORT = 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('db connected')
  app.listen(5000, () => {
    console.log('Server started at port ' + PORT)
  })
})

// CREATE TODO
app.post('/todo', (req, res) => {
  const parsed = addTodoPayload.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Wrong request body',
    })
  }

  User.create({
    title: parsed.data.title,
    description: parsed.data.description,
    completed: false,
  })
    .then(() => {
      return res
        .status(200)
        .json({ message: 'task added successfully', task: parsed })
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: 'error occured', error: err.message })
    })
})

// GET ALL TODO
app.get('/todos', (req, res) => {
  User.find({})
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      return res.status(400).json({ message: 'error occured', error: err })
    })
})

// UPDATE TODO
app.put('/todo', (req, res) => {})

// DELETE TODO
app.delete('/todo', (req, res) => {})
