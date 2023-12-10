import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Order from '../components/Order';
// import handleSearchBar from '../submitHandling.mjs'

export const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([])

    // Food data fetching logic :
    const loadOrders = async () => {
        try {

            let headersList = {
                "Accept": "*/*",
                "auth-token": `${localStorage.getItem("authToken")}`
            }

            let response = await fetch("http://localhost:5000/api/getOrder", {
                method: "GET",
                headers: headersList
            });
            response = await response.json();
            return response.orders;
        } catch (error) {
            return error;
        }
    }

    localStorage.getItem('authToken') !== null ?
        useEffect(() => {

            loadOrders()
                .then((orders) => {
                    setMyOrders(orders);
                })
                .catch((error) => {
                    console.log(error.message);
                })

        }, [])
        :
        console.log(`Can't load data`);

    return (
        <>
            <div>
                <Modal />
            </div>
            <div className="container" style={{
                minHeight: `150vh`
            }}>
                {
                    myOrders && myOrders.length !== 0 ? (
                        myOrders.map((order, index, array) => {
                            return (
                                <div id='order-container' className='container m-3' key={order._id}>
                                    <h3 className='m-4'>{order.Order_Date}</h3>
                                    <hr />
                                    <div className="row">
                                        {
                                            order.Order_Items
                                                .map((order_item, index, array) => {
                                                    return (
                                                        <div className="col-md-3 mx-4 my-5">
                                                            <Order key={order_item._id} orderItem={order_item} orderTime={order.Order_Time} />
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
                                {!myOrders ?
                                    `Sorry, No Such Data to Show You.!` :
                                    `You have no such orders yet!`
                                }
                            </i>
                        </div>
                    )
                }
            </div>
        </>
    )
}
