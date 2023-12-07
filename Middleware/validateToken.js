const aysncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = aysncHandler(async (req, res, next) => {
  try {
    let token;  
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if(err) {
          res.status(401).send({ message: "Unauthorized access!" });
          // throw new Error("Unauthorized access!");
        } else{
          req.user = decoded; //decoded is the payload
          next();
        }
      
      })
    }
  } catch (error) {
    
  }
});

module.exports = validateToken;