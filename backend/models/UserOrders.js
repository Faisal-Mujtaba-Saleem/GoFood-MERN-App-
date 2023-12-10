const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserOrdersSchema = new Schema({
    user: {
        type: Object,
        required: true,
        unique: true
    },
    orders: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// console.log(UserOrdersSchema)
module.exports = mongoose.model("user_orders", UserOrdersSchema)