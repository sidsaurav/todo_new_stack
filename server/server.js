const express = require('express')
const app = express

app.use(express.json())

const PORT = 5000
app.listen(5000, ()=>{
    console.log('Server started at port' + PORT)
})


// GET ALL TODO
app.get('/todos', (req, res)=>{

})

// CREATE TODO
app.post('/todos', (req, res)=>{

})

// UPDATE TODO
app.put('/todos', (req, res)=>{

})