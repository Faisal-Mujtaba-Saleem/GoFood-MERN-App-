import React, { useContext } from 'react'
import ReactDOM from 'react-dom';

import Cart from '../components/Cart'
import { CartDispatchContext, CartStateContext } from '../ContextReducers/Cart_ContextReducer';
import { AlertContext } from '../contexts/alert/AlertContext';
import Alert from '../components/Alert';

const Modal = () => {
    const cartState = useContext(CartStateContext);
    const dispatchCart = useContext(CartDispatchContext);
    const { alert, showAlert } = useContext(AlertContext); ("Your order has been sent to the Server!", "success")

    const postOrder = async () => {
        try {
            let headersList = {
                "Accept": "*/*",
                "auth-token": `${localStorage.getItem("authToken")}`,
                "Content-Type": "application/json"
            }

            let bodyContent = JSON.stringify({
                "order": {
                    "Order_Date": new Date().toLocaleDateString(),
                    "Order_Time": new Date().toLocaleTimeString(),
                    "Order_Items": cartState
                }
            });

            let response = await fetch("http://localhost:5000/api/foodOrder", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            response = await response.json();
            console.log(response);
            return response;
        } catch (error) {
            return error;
        }

    }

    const handleCheckOut = async () => {
        try {
            await postOrder();
            dispatchCart({ type: "DROP" });
            showAlert("Your order has been sent to the Server!", "success")
        }
        catch (error) {
            console.error(error.message);
        }
    }

    return ReactDOM.createPortal(
        <>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h1 className="modal-title btn btn-success text-white fs-5 fw-bold rounded-1 " id="staticBackdropLabel">Food Cart</h1>
                            <div className="mx-4 ">
                                {alert && <Alert />}
                            </div>
                            <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" data-bs-theme="dark">
                            <Cart />
                        </div>
                        <div className="modal-footer d-flex flex-wrap justify-content-start ">
                            <button type="button" className="btn btn-primary bg-success text-white fw-semibold " onClick={handleCheckOut}>Check Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal
