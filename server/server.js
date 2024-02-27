const express = require('express')
const app = express()
const { addTodoPayload } = require('./types')

app.use(express.json())

const PORT = 5000
app.listen(5000, ()=>{
    console.log('Server started at port ' + PORT)
})



// CREATE TODO
app.post('/todo', (req, res)=>{
    const parsed = addTodoPayload.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json({
            message: "Wrong request body"
        })
    }
    return res.json('all right ready to connect to db')
})

// GET ALL TODO
app.get('/todos', (req, res)=>{

})

// UPDATE TODO
app.put('/todo', (req, res)=>{

})

// DELETE TODO
app.delete('/todo', (req, res)=>{

})