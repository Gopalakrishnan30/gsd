const userJwtModel=require('../models/userJwt')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const {validator,schema}=require('../schema/schema-suit')
exports.register=async(req,res)=>{

const { first_name, last_name, email, password } = req.body;
const  TOKEN_KEY='AJDKASDKASJKLDJSAKLDASLDJALS9878HJB';
const valid = validator.validate(req.body, schema);

if (!valid.valid) {
  return res.status(400).json({ error: valid.errors });
}

  try {
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input are required");
    }
    const oldUser = await userJwtModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
   let  encryptedPassword = await bcrypt.hash(password, 10);
    const user = await userJwtModel.create({
      first_name,
      last_name,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send({
        message: err.message
    });
  }
}

exports.login=async(req,res)=>{
    const  TOKEN_KEY='AJDKASDKASJKLDJSAKLDASLDJALS9878HJB';

    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        const user = await userJwtModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }      
}

exports.testJwt=async(req,res)=>{
    res.status(200).send("Welcome 🙌 ");

}
