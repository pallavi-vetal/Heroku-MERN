const keys = require("../../config/keys");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken")
const Users = require('../../models/Users');
const validators = require("../../validation/validators");
const express = require("express");
const router = express.Router();

router.post('/register',(req,res) => {
   
    const { errors, isValid } = validators.registerValidator(req.body);
    if(!isValid){
        res.status("400").json(errors);
    }
    Users
    .findOne({email: req.body.email})
    .then((user) =>{
        if(user){
             res.status(404).json({"email":"Email ID already exists!"});
        }
        else{
            const registerUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(registerUser.password, salt, (err, hash) => {
                  
                  registerUser.password = hash;
                  registerUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        }
    })
   
});

router.post('/login',(req,res)=>{
    const { errors, isValid } = validators.loginValidator(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  Users.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" });
      }
    });
  });
});
module.exports = router;