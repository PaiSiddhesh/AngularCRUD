const express = require('express');
const bcrypt = require ('bcrypt')
 const userController = require('../controllers/user.controller');
 const asyncHandler = require('express-async-handler');
 const authController = require ('../controllers/auth.controller');
const router =  express.Router();

const passport = require('../middleware/passport');
 
   //Added middleware to routes.
    

  //localhost:4050/api/auth/login
   router.post('/login',asyncHandler(getUserByEmailIdAndPassword),login);
   // router.post('/login',asyncHandler(getUserByEmailIdAndPassword));


  //localhost:4050/api/auth/register
  router.post('/register',asyncHandler(insert),login);
   
  //router.post('/login',passport.authenticate("local",{session:false}),login);
  router.get('/findme',passport.authenticate("jwt",{session:false}),login);




  async function insert(req,res,next){
    const user = req.body;
    console.log('Registering The User',user);
    // const savedUser = await userController.insert(user); insert data in db and get the data in the request object.
     req.user= await userController.insert(user); // modify the request object.
    // res.json(savedUser);
     next();         // responce object to be modified only once and here next() is login() function.
    }


  

  async function getUserByEmailIdAndPassword(req,res,next){

    const user = req.body;
    console.log(`Searching User For `,user);
 
    const savedUser = await userController.getUserByEmailIdAndPassword(
        user.email,
        user.password 
    );
   req.user=savedUser; 
   //res.json(savedUser);
    next();
   }





   function login(req, res){
   // const user = req.body;
    const user= req.user;
      const token = authController.generateToken(user);
       res.json({
         user,
         token
        });
    }
   
    
module.exports= router;