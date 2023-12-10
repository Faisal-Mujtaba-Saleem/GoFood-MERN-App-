const express = require("express");

const UserOrders = require('../models/UserOrders');
const fetchUser = require('../custom_middlewares/fetchUser');

// GET Request for getting User's Orders.
const router = express.Router();
router.get('/getOrder',
    fetchUser,
    async (req, res) => {
        try {
            const user = req.user;

            let user_orders = await UserOrders.findOne({ user });
            console.log(user_orders);

            if (user_orders) {
                const { orders } = user_orders;
                res.status(200).json({ success: true, orders })
            } else {
                console.log(`No Orders found related to that user ${user}`);
                return res.status(404).json({ success: false, error: "No Orders found!" })
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    })

module.exports = router;