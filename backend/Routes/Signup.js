const express = require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

// POST Request for SignUp Page
const router = express.Router();
router.post('/createuser',
    body('email', "The username or email is not valid").isEmail(),
    body('name', 'Please enter the name of minimum length 5').isLength({ min: 5 }),
    body('password', 'Please enter the password of minimum length 5').isLength({ min: 5 }),
    body('location', 'Please enter the location of minimum length 10').isLength({ min: 10 })
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const SecretKey = process.env.SECRET_KEY;

            const { name, email, location } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const signinUserData = await User.create({ name, email, password: hashedPassword, location });

            console.log(signinUserData);

            const { name: userName, _id, email: userEmail, location: userLocation } = signinUserData;

            const JWT_Data = {
                user: {
                    _id,
                    name: userName,
                    email: userEmail,
                    location: userLocation
                }
            }

            const authToken = jwt.sign(JWT_Data, SecretKey)

            res.json({
                success: true,
                authToken,
                signinUserData,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Internal Server Error" })
        }
    })

module.exports = router;