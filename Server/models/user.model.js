const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({
    fullName:{
        type:String ,
        required:true

    },
    email:{
        type:String ,
        required:true,
        unique:true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            'Please Enter Valid Email'
        ]
    },
    hashedPassword:{
        type: String ,
        required:true
    },
    createdAt :{
        type :Date,
        default :Date.now
    },
    roles :[
        {
           type: String
        }    
    ],
    versionKey : false
});

module.exports = mongoose.model('User',UserSchema) ;