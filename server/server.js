const express = require('express')
const app = express()
const { addTodoPayload, updateTodoPayload, deletePayload } = require('./types')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { Task } = require('./db')
const cors = require('cors')
dotenv.config()

app.use(express.json())
app.use(cors())

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

  Task.create({
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
  Task.find({})
    .then((data) => {
      return res.status(200).json(data)
    })
    .catch((err) => {
      return res.status(400).json({ message: 'error occured', error: err })
    })
})

// MARK AS COMPLETED TODO
app.put('/todo', async (req, res) => {
  const parsed = updateTodoPayload.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Wrong request body',
    })
  }

  Task.findOneAndUpdate({ _id: req.body.id }, { completed: true })
    .then((data) => {
      return res
        .status(200)
        .json({ message: 'successfully marked as completed' })
    })
    .catch((err) => {
      return res.status(400).json({ message: 'error occured', error: err })
    })
})

// DELETE TODO
app.delete('/todo', (req, res) => {
  let parsed = deletePayload.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Wrong request body',
    })
  }

  Task.deleteOne({ _id: req.body.id })
    .then((data) => {
      return res.status(200).json({ message: 'deleted successfully', data })
    })
    .catch(() => {
      return res
        .status(400)
        .json({ message: 'something went wrong', error: err })
    })
})
