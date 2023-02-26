const bcrypt = require('bcrypt');
// //const { nextTick } = require('process');
//const User = require('../../src/app/user');
const User = require('../models/user.model');
users = [];

async function insert(user){
      //make a mongoDB call to save user in DB
    
    //  users.push(user); 
    //  return user;
      user.hashedPassword = bcrypt.hashSync(user.password,10);
      delete user.password ;      
      console.log(`Saving User To DB`,user);
     return await new User(user).save();

}

async function getUserByEmailIdAndPassword(email,password){
   
    //const user = await userController.getUserByEmailIdAndPassword
         let user = await User.findOne({email});  
   
         if (isUserValid(user,password,user.hashedPassword ))
         {
            user= user.toObject(); 
            delete user.hashedPassword;
            return user;
         } else{
             return null;
         }

      }

      async function getUserByID(id) {
        let user= await User.findById(id) ; 
        if (user){
        user= user.toObject();
        //No need to send hashedpassword to UI
        delete user.hashedPassword;
        return user;
        } else {
            return null;
        }
          
       }

       function isUserValid(user,password,hashedPassword){
        return user && bcrypt.compareSync(password,hashedPassword);
      }
      


module.exports = {
    insert,
    getUserByEmailIdAndPassword,
    getUserByID
};