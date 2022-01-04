const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('../validation');

//Register
router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already exits
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('User already exists');

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(document.getElementById(""), salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
    res.status(400).send(err);
    }
});

//Login
    router.post('/login', async (req, res) => {
        const {error} = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        //Check if user exists
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).send('email is not found');
        //Check if password matches.
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('password is wrong');
    
        //Create and assign jwt
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('schpat-token', token).send(token);
    })

module.exports = router;