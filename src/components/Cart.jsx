import React, { useContext, useEffect } from 'react'
import { CartDispatchContext, CartStateContext } from '../ContextReducers/Cart_ContextReducer'
import { AlertContext } from '../contexts/alert/AlertContext';

const Cart = () => {
    const cartState = useContext(CartStateContext);
    const dispatchCart = useContext(CartDispatchContext);
    const { showAlert } = useContext(AlertContext);

    if (cartState.length === 0) {
        return (
            <>
                <h1 className="text-center">The Cart is Empty!</h1>
            </>
        )
    }

    const totalAmount = cartState.reduce(
        (sum, { foodPrice }) => {
            return sum + foodPrice;
        }, 0
    );

    const handleRemoveItem = (id) => {
        dispatchCart({ type: "REMOVE", payload: { id } });
        showAlert("The item has been REMOVED from the Cart!", "success")
    }

    return (
        <>
            <div className="container">
                <table className="table table-dark">
                    <thead>
                        <tr className='text-success'>
                            <th className='mx-2 text-success fs-4 ' scope="col">#</th>
                            <th className='mx-2 text-success fs-4' scope="col">Name</th>
                            <th className='mx-2 text-success fs-4' scope="col">Quantity</th>
                            <th className='mx-2 text-success fs-4' scope="col">Size</th>
                            <th className='mx-2 text-success fs-4' scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // payload: { id: foodItem._id, foodName: foodItem.name, foodCategory: foodItem.CategoryName, foodDescription: foodItem.description, foodQty, foodSize, foodPrice }
                            cartState.map((foodItem, index) => {
                                return (
                                    <tr key={index}>
                                        <th className='mx-2' scope="row">{index + 1}</th>
                                        <td>{foodItem.foodName}</td>
                                        <td>{foodItem.foodQty}</td>
                                        <td>{foodItem.foodSize}</td>
                                        <td>{foodItem.foodPrice}/~</td>
                                        <td onClick={() => { handleRemoveItem(foodItem.id) }}>
                                            <i className="fa-solid fa-trash-can btn"></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <br />

                <h3>Total Amount: <span>{totalAmount}/~</span></h3>
            </div>
        </>
    )

}

export default Cart