const jwt = require("jsonwebtoken");

const auth = function (req,res,next){

    let token = req.headers["x-auth-token"];

    if (!token) return res.send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "functionup-lithium-very-very-secret-key");

    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });
        
       req.docoded = decodedToken

     next()
              
}


module.exports.auth = auth;