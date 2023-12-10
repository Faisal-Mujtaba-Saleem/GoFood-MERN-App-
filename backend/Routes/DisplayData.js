const express = require("express");
const router = express.Router();

// GET Request for getting Food Data 
router.get('/foodData', (req, res) => {
    try {
        res.status(200).json([global.food_items, global.foodCategories]);

    } catch (error) {
        console.log(error);
        res.status(400).send(`Server Error: ${error.message}`)
    }
})

module.exports = router;