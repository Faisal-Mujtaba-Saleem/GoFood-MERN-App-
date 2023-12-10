import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartStateContext } from '../ContextReducers/Cart_ContextReducer';
import { AlertContext } from '../contexts/alert/AlertContext';

const Navbar = (props) => {
    const cartState = useContext(CartStateContext);
    const { showAlert } = useContext(AlertContext);

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        showAlert("Thank you for choosing GoFood! You are now logged out. We hope you enjoyed your meal!", "success");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic fw-semibold " to="/">{props.appTitle}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5 fw-semibold " aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                localStorage.getItem('authToken') !== null ?
                                    <li className="nav-item" style={
                                        { width: '10vw' }
                                    }>
                                        <Link className="nav-link active fs-5 fw-semibold p-2 " aria-current="page" to="orders">Orders</Link>
                                    </li>
                                    : null
                            }
                        </ul>
                        <div className=" d-flex justify-content-end w-100 ">
                            {
                                localStorage.getItem('authToken') === null ?
                                    <>
                                        <Link className="btn btn-light text-success mx-1 fw-bold rounded-1 " to="/Login">Login</Link>
                                        <Link className="btn btn-light text-success mx-1 fw-bold rounded-1 " to="/createuser">Sign Up</Link>
                                    </>
                                    :
                                    <>
                                        <button type="button" className="btn btn-light text-success mx-1 fw-bold rounded-1 position-relative" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            {/* My Cart */}
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartState.length}</span>
                                        </button>
                                        <Link className="btn btn-light text-danger mx-1 fw-bold rounded-1" onClick={handleLogout}
                                            to="/Login">Logout</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
}

Navbar.propTypes = {
    appName: PropTypes.string.isRequired,

};

Navbar.defaultProps = {
    appName: 'Your App Name',
};

export default Navbar;