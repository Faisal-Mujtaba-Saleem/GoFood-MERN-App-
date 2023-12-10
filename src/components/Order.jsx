import { useContext, useEffect, useRef, useState } from "react";
import { CartDispatchContext, CartStateContext } from "../ContextReducers/Cart_ContextReducer";

export default function Order(props) {
    const { orderItem, orderTime } = props;

    return (
        <>
            <div class="card bg-transparent text-white border-secondary mb-3" style={
                { width: "120%", }
            }>
                <div class="row g-0">
                    <div class="col-md-4 w-100 ">
                        <img src={orderItem.foodImage} class="img-fluid rounded-start" alt="..." style={
                            {
                                height: "12rem",
                                width: "100%",
                                objectFit: "cover"
                            }
                        } />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{orderItem.foodName}</h5>
                            <div className="d-flex my-0">
                                <p class="card-text">{orderItem.foodQty}.</p>
                                {" "}
                                <p class="card-text">{orderItem.foodSize}</p>
                            </div>
                            <p class="card-text">Rs. {orderItem.foodPrice}/~</p>

                            {/* <hr /> */}

                            <div class="card-footer border-secondary ">
                                <span className="fs-6">Ordered At:</span>
                                <small class="text-body-white">
                                    <span class="badge text-bg-success">{orderTime}
                                    </span>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

