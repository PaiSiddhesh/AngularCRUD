const jwt = require('jsonwebtoken');
const config = require('../config/config');

// take user and create jwt token
function generateToken(user){
const payload = JSON.stringify(user);
//return jwt.sign(payload,config.jwtSecret,{expireIn:'1h'} );
return jwt.sign(payload,config.jwtSecret );
}
module.exports = { generateToken};