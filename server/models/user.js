const { urlencoded } = require('express');
const mongoose = require('mongoose');
const {ObjectID} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  pic:{
    type:String,
    default:'https://res.cloudinary.com/vk-cloud/image/upload/v1608902789/default_photo_geqyig.jpg'
  },
  followers:[{type:ObjectID,ref:"User"}],
  following:[{type:ObjectID,ref:"User"}],
});

mongoose.model("User",userSchema)