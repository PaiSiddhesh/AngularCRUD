// const express = require ('express');
// const path = require ('path')
// const port = process.env.PORT || 4260;
// const app = express();

// const destinationDir = path.join(__dirname,'../dist');
// // hosting from dist folder
// app.use(express.static(destinationDir));
// console.log(`express hosting from $(destinationDir)`);

// // serving index.html
// app.get('*',(req,res)=>{
//  res.sendFile(path.join(destinationDir,'index.html'));
// });
// console.log('Serving Index.html');
// // Initialize app and listen to port
// app.listen(port,()=>console.log(`Server Is Running On Port ${port}`));


const app =  require('./config/express');
const config = require('./config/config');

//  Mongoose will run and Initialise Mongo DB server.
require('./config/mongoose');


// listen to the port
   app.listen(config.port,()=>{
    console.log(`Server Started On Port Number ${config.port} (${config.env})`);
    
    });