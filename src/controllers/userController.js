const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
 
  xyz.send({ msg: savedData });
};


//login 
const loginUser = async function (req, res) {

  let useremailid= req.body.emailId;
  let password = req.body.password;
  let user = await userModel.findOne({ emailId: useremailid, password: password ,isDeleted: false}) ;
   
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
 
  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
  // The same secret will be used to decode tokens 
  let token = jwt.sign(
    {
      userId: user._id ,
      batch: "lithium",
      organisation: "FunctionUp",
    },
    "functionup-lithium-very-very-secret-key"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};




const getUserData = async function (req, res) {
 
       //If no token is present in the request header return error. This means the user is not logged in.
        
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself

  // Decoding requires the secret again. 
  // A token can only be decoded successfully if the same secret was used to create(sign) that token.
  // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
   
      
    if(req.params.userId!=req.docoded.userId)
     {return res.send({ status: false, msg: "No such user exists" })}

  let userId = req.params.userId;
     let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
  // Note: Try to see what happens if we change the secret while decoding the token
};




//update user flag true
const updateUser = async function (req, res) {
   
       
    if(req.params.userId!=req.docoded.userId)
     {return res.send({ status: false, msg: "No such user exists" })}
     
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
      
  let updatedUser = await userModel.findOneAndUpdate({ _id: req.params.userId },  {isDeleted: true},{new : true});
  res.send({ status: updatedUser, data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;