const mongoose = require('mongoose');
const fs = require('fs').promises;
require('dotenv').config();

const db_password = process.env.DB_PASSWORD;
const mongoURI = `mongodb+srv://faisalmujtaba2005:${db_password}@dev-gofood-cluster.v5hj3rp.mongodb.net/?retryWrites=true&w=majority`;

// Example: Reading a file
async function read_file(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error.message);
    }
}

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(mongoURI);
        console.log('connected to db');

        const foodItems_collection = await mongoose.connection.db.collection("food-items");
        const foodCategories_collection = await mongoose.connection.db.collection("foodCategories");

        let foodItems_documents = await foodItems_collection.find({}).toArray();
        let foodCategory_documents = await foodCategories_collection.find({}).toArray();

        if (foodItems_documents.length === 0) {
            const foodItemsJson = await read_file("C:/Users/Faisal/OneDrive/Desktop/New folder/Faisal Course (BQ)/Projects/Project-2 (Food Delivery App)/food-delivery-app/Json Food Data/foodItems.json");
            await foodItems_collection.insertMany(foodItemsJson);
            foodItems_documents = await foodItems_collection.find({}).toArray();
        }
        if (foodCategory_documents.length === 0) {
            const foodCategoryJson = await read_file("C:/Users/Faisal/OneDrive/Desktop/New folder/Faisal Course (BQ)/Projects/Project-2 (Food Delivery App)/food-delivery-app/Json Food Data/foodCategory.json");
            await foodCategories_collection.insertMany(foodCategoryJson);
            foodItems_documents = await foodItems_collection.find({}).toArray();
        }

        global.food_items = foodItems_documents;
        global.foodCategories = foodCategory_documents;
    } catch (error) {
        console.log(`Some error occured : ${error.message}`);
    }
}

// connectDB()
module.exports = connectDB;