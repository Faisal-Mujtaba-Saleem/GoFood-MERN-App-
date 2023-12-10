const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const connectDB = require('./db');
connectDB();

const CreateUser = require('./Routes/Signup');
const LoginUser = require('./Routes/Login');
const DisplayData = require('./Routes/DisplayData');
const PostOrders = require('./Routes/PostOrders');
const FetchOrder = require('./Routes/FetchOrder');

const options = {
    origin: 'http://localhost:3000',
    method: 'GET, POST',
    optionSuccessStatus: '200'
}

app.use(cors(options));
app.use(express.json());

app.use('/api', CreateUser);
app.use('/api', LoginUser);
app.use('/api', DisplayData);
app.use('/api', PostOrders);
app.use('/api', FetchOrder);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Food-Delivery app listening on port ${port}"`)
})