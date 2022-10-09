const express = require('express')
const app = express()

app.listen(5600)

app.use(()=> {
    console.log('Time:', Date.now())
})
app.get('/', (req, res)=>{
  console.log('Time:', Date.now())
  res.send("home")
})
app.get('/anotherRoute', (req, res)=>{
  console.log('Time:', Date.now())
  res.send("anotherRoute")
})
