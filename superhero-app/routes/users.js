const express = require('express');
const User = require('../models/user');
const validateSuperhero = require('../middlewear/validateSuperhero');
const mongoose= require('mongoose');
const validateUser = require('../middlewear/validateUSer');
const router = express.Router();


//register
router.post('/', async (req, res) => {
    try {
        
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //Find the user by the email
        let user =await User.findOne({email:req.body.email})
        
        if(!user)return res.status(400).send('User already exist');
         
          user = new User({
            name: req.body.name,
           email: req.body.power,
           password: req.body.password
        });

        const savedUser = await user.save();
        
        res.send(savedUser);
    } catch (err) {
        res.status(500).send('An error occurred while saving the user.');
    }
});


module.exports = router;
