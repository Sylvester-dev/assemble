const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI}=require('./keys') 


mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
mongoose.connection.on('connected',()=>{
  console.log("connected to mongodb");
})
mongoose.connection.on('error',(err)=>{
  console.log("Cant connect to mongodb",err);
})

require('./models/user')
require('./models/post')

app.use(express.json())  //middleware .use
app.use(require('./routes/auth'))  
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.listen(PORT,()=>{
  console.log("Server is running on",PORT);
})

