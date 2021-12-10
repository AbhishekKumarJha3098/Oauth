

require("dotenv").config();

const jwt = require("jsonwebtoken")

const user = require("../models/user.model");
const newToken = (user) => {
    return jwt.sign({user : user}, process.env.JWT_ACCESS_KEY);
};

const register = async(req,res) => {
    try{

        let user = await user.findOne({email: req.body.email}).lean().exec();
        
        if(user) return res.status(400).json({ status: "failed", message: "plj provide a different email",});

      user = await User.create(req.body);

      const token = newToken(user);

    res.status(201).send("Register");
}
catch(e){
    return res.status(500).json({ status: "failed", message: e.message});
}
};
const login =(req,res) => {
    res.status(201).send("Login");
};

module.exports = { register, login};