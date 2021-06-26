
const mongoose=require('mongoose');

const userSchema=mongoose.Schema;

var users=new userSchema({
    first_name:{
        type:String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required: true
    },
    retypepwd:{
        type:String,
        required: true
    }
});

const user = module.exports = mongoose.model('users',users);