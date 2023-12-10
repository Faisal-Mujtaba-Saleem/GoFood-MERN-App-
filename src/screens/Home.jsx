import React, { useState, useEffect } from 'react'

import Card from "../components/Card"
import Carousel from "../components/Carousel";
import Modal from './Modal';

export default function Home() {

    // Food data fetching logic :
    const [food_items, setFoodItem] = useState([])
    const [foodCategories, setfoodCategory] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/fooddata", {
            method: "GET",
            headers: {
                "Accept": "*/*"
            }
        });
        response = await response.json();

        return response;
    }


    loadData()
        .then((response) => {
            setFoodItem(response[0]);
            setfoodCategory(response[1]);
        })
        .catch((error) => {
            console.log(error.message);
        })

    const [Search, setSearch] = useState('');

    return (
        <>
            <div>
                <Modal />
            </div>
            <div>
                <Carousel Search={Search} setSearch={setSearch} />
            </div>
            <div className="container">
                {
                    foodCategories && foodCategories.length !== 0 ? (
                        foodCategories.map((foodCategory, index, array) => {
                            return (
                                <div id='foodCategory-container' className='container m-3' key={foodCategory._id}>
                                    <h3 className='m-4'>{foodCategory.CategoryName}</h3>
                                    <hr />
                                    <div className="row">
                                        {
                                            food_items
                                                .filter((food_item, index, array) => {
                                                    return (
                                                        (food_item.CategoryName === foodCategory.CategoryName) &&
                                                        (
                                                            food_item.name.toLowerCase().includes(Search.toLowerCase())
                                                            ||
                                                            food_item.CategoryName.toLowerCase().includes(Search.toLowerCase())
                                                        )
                                                    );
                                                })
                                                .map((food_item, index, array) => {
                                                    return (
                                                        <div key={index} className="col-md-3 mx-4 my-5">
                                                            <Card key={food_item._id} foodItem={food_item} foodOptions={food_item.options[0]} />
                                                        </div>
                                                    );
                                                })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="container m-4">
                            <i>
                                Sorry, No Such Data to Show You.
                            </i>
                        </div>
                    )
                }
            </div>
        </>
    )
}
