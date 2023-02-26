// Server Setting File.
const express = require('express')
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');

const HttpError = require('http-errors');

// get app
const app = express();

// setup logger
if(config.env === 'development'){
    app.use(logger('dev'));
}

// get the dist folder
const distDir = path.join(__dirname,'../../dist');

// use dist folder as hosting folder by express
 app.use(express.static(distDir));

 //parsing from api
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

 // secure http calls
 app.use(helmet());

 // allow cors origin
 app.use(cors());

 //authenticate with passport
 app.use (passport.initialize()); 

 // api router 
 //localhost:4050/api/
 app.use('/api/',routes);

 // serve the index.html 
 app.get('*',(req,res)=>res.sendFile(path.join(distDir,'index.html')));

 // catch the 404 and forward to the error handler
 app.use((req,res,next)=>{
     const error = new HttpError(404); 
     return next(error);
 });

 // error handler , stack trace
  app.use((error, req,res, next)=>{
      res.status(error.status|| 500).json({
      message : error.message    
      });
      next (error);
  });

 module.exports = app;