const mongoose = require('mongoose');
const {ObjectID} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  photo:{
    type:String,
    // default:"no photo"
    required:true
  },

  likes:[{type:ObjectID,ref:"User"}],

  comments:[{
    text:String,
    postedBy:{type:ObjectID,ref:"User"}
  }],
  
  postedBy:{
    type:ObjectID,  //making connection to objectID of user creating this post 
    ref:"User"       //reffer to User
  },  
})

mongoose.model("Post",postSchema)