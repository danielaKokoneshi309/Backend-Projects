const express = require('express');
const User = require('../models/user');
const validateSuperhero = require('../middlewear/validateSuperhero');
const mongoose= require('mongoose');
const validateUser = require('../middlewear/validateUSer');
const { argon2d } = require('argon2');
const router = express.Router();
const jwt= require('jsonwebtoken')


router.post('/', async (req, res) => {
    try {
        
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //Find the user by the email
        let user =await User.findOne({email:req.body.email})
        
        if(!user)return res.status(400).send('User already exist');
         const verifyPassword= await argon2d.verify(req.body.password, user.password);
         if(!verifyPassword) return res.status.send('Invalid')
        
           const token= jwt.sign({_id:user._id},'jwtkey')
        res.send(token);
    } catch (err) {
        res.status(500).send('An error occurred while saving the user.');
    }
});
function validate(req){
   
    const schema = Joi.object({
        
        email: Joi.string().min(3).required(),
        password: Joi.string().min(5).required(),
    });
    
    return  schema.validate(user);
    }

module.exports = router;
