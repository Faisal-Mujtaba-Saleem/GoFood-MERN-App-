const express = require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

// POST Request for Login Page
const router = express.Router();
router.post('/loginuser',
    body('email', "The username or email is not valid").isEmail(),
    body('password', 'Please enter the password of minimum length 5').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const SecretKey = process.env.SECRET_KEY;

            const { email, password } = req.body;

            const loginUserData = await User.findOne({ email });
            console.log(loginUserData);

            const { name: userName, _id, email: userEmail, password: userPassword, location: userLocation } = loginUserData;
            // const { name, _id, email: userEmail, location } = loginUserData;

            const pwdComparison = bcrypt.compare(password, userPassword);

            if (!loginUserData) {
                return res.status(400).json({ error: 'try login with correct email/username' })
            } else if (!pwdComparison) {
                return res.status(400).json({ error: 'try login with correct password' })
            } else {
                const JWT_Data = {
                    user: { _id, name: userName, email: userEmail, location: userLocation }
                }
                const authToken = jwt.sign(JWT_Data, SecretKey)

                res.json({
                    success: true,
                    authToken,
                    loginUserData,
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    })

module.exports = router;