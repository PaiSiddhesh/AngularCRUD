const mongoose = require ('mongoose');
const util = require ('util');
const debug = require ('debug')('express-mongoose-es6-rest-api:index');
const config = require('../config/config');

const mongoUri = config.mongo.uri;



mongoose.connect(mongoUri,{keepAlive:1,useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true});
const db = mongoose.connection;



db.once('open',()=>{
    console.log(`Connected To The Database: ${mongoUri}`);
});

db.on('error',() => {
        throw new error(`Unable To Connect The Database : ${mongoUri}`);
    });

if(config.mongo.debug){
    mongoose.set('debug',(collectionName ,method,query,doc)=>{
    debug(`${collectionName}.${method}`,util.inspect(query,false,20),doc);
    });
}
module.exports=db;