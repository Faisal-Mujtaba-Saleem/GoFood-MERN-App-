const express = require("express");
const { body, validationResult } = require('express-validator');

const UserOrders = require('../models/UserOrders');
const fetchUser = require('../custom_middlewares/fetchUser');

// POST Route for Login Page
const router = express.Router();
router.post('/foodOrder',
    body('order', 'Order should be an Object.').isObject(),
    fetchUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { order } = req.body;
            const user = req.user;

            let user_orders = await UserOrders.findOne({ user });
            console.log(user_orders);

            if (!user_orders) {
                try {
                    user_orders = await UserOrders.create({
                        user,
                        orders: [order]
                    });
                    console.log(user_orders);
                    res.status(200).json({ success: true });
                } catch (error) {
                    console.error(error.message);
                    res.status(500).json({ success: false, error: "Internal Server Error" });
                }
            } else {
                try {
                    user_orders = await UserOrders.findOneAndUpdate({ user }, {
                        $push: { 'orders': order }
                    })
                    console.log(user_orders);
                    res.status(200).json({ success: true });
                } catch (error) {
                    console.error(error.message);
                    res.status(500).json({ success: false, error: "Internal Server Error" });
                }
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    })

module.exports = router;