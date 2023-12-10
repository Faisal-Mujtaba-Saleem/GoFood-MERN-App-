import { useContext, useEffect, useRef, useState } from "react";
import { CartDispatchContext, CartStateContext } from "../ContextReducers/Cart_ContextReducer";
import { AlertContext } from "../contexts/alert/AlertContext";

export default function Card(props) {
    const { showAlert } = useContext(AlertContext);

    const { foodOptions, foodItem } = props;
    const sizeOptions = Object.keys(foodOptions);

    const cartState = useContext(CartStateContext);
    const dispatchCart = useContext(CartDispatchContext);

    const foodQtyRef = useRef(null);
    const [foodQty, setFoodQty] = useState(null);

    const foodSizeRef = useRef(null);
    const [foodSize, setFoodSize] = useState(null);

    useEffect(() => {
        setFoodQty(foodQtyRef.current.value);
        setFoodSize(foodSizeRef.current.value);

    }, [])

    const foodPrice = foodOptions[foodSize] * foodQty;

    const handleQtyChange = (e) => { setFoodQty(e.target.value) };
    const handleSizeChange = (e) => { setFoodSize(e.target.value) };

    const handleAddToCart = (e) => {
        let action = { type: "ADD", payload: { id: foodItem._id, foodName: foodItem.name, foodCategory: foodItem.CategoryName, foodImage: foodItem.img, foodDescription: foodItem.description, foodQty, foodSize, foodPrice } };
        let cartItem = null;
        for (const item in cartState) {
            if (cartState[item].id === foodItem._id) {
                cartItem = cartState[item];
                break;
            }
        }

        if (cartItem !== null) {
            if (foodSize === cartItem.foodSize) {
                action = { type: "UPDATE", payload: { id: foodItem._id, foodQty, foodPrice } }
                dispatchCart(action);
                showAlert("Your item has been UPDATED into Cart!", "success");
                return
            } else if (foodSize !== cartItem.foodSize) {
                dispatchCart(action);
                showAlert("Your item has been ADDED to Cart!", "success");
                return
            }
        }

        dispatchCart(action);
        showAlert("Your item has been ADDED to Cart!", "success");
    }

    return (
        <>
            <div className="card bg-transparent border-secondary" style={
                { width: "120%", }
            }>
                <img src={foodItem.img} className="card-img-top" alt="..."
                    style={
                        {
                            height: "12rem",
                            objectFit: "cover"
                        }
                    } />
                <div className="card-body">
                    <h5 className="card-title text-white">{foodItem.name}</h5>
                    {/* <p className="card-text text-white">{foodItem.description}</p> */}
                    <div className="container w-100 ">
                        <div className="mx-2 my-2">
                            <select name="foodQty" id="foodQty" className="h-100 bg-success text-white rounded-1 fw-semibold" ref={foodQtyRef} onChange={handleQtyChange}>
                                {
                                    Array.from(Array(6), (elem, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <select name="foodSize" id="foodSize" className="m-3 h-100 bg-success text-white rounded-1 fw-semibold text-center" ref={foodSizeRef} onChange={handleSizeChange}>
                                {
                                    sizeOptions.map(
                                        (sizeOption) => {
                                            return <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                                        }
                                    )
                                }
                            </select>

                            <div className="d-inline h-100 fs-5 text-white ">
                                Rs.{foodPrice}/~
                            </div>
                        </div>

                        {
                            localStorage.getItem('authToken') &&
                            <div className="container border-0 border-top border-secondary my-2 ">
                                <button className="btn btn-success text-dark ms-2 mt-4 fw-bold rounded-1" onClick={handleAddToCart}>
                                    <span>
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </span>
                                    {" "}
                                    Add to Cart
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}
