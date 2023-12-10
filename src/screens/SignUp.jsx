import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/alert/AlertContext';

export default function SignUp() {
    const { showAlert } = useContext(AlertContext);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        response = await response.json()
        console.log(response);

        if (!response.success) {
            showAlert("Invalid credentials! Enter the valid credentials.", "danger");
        } else
            if (response.success) {
                // Vanilla JS Method :
                // location.assign('http://localhost:3000/')

                // REACT JS Method :
                localStorage.setItem('authToken', response.authToken);
                console.log(localStorage.getItem('authToken'));
                navigate("/");

                showAlert("Welcome to your food hub! Sign up complete. Time to eat!", "success");
                setTimeout(() => {
                    window.scrollTo({ top: 665, behaviour: "smooth" });
                }, 2000);
            }
    }

    return (
        <>
            <div className="container my-5 h-100" style={{
                minHeight: `100vh`
            }}>
                <div className="my-5 text-light">
                    <h1>Join the GoFood feast – Sign Up Today!</h1>
                </div>
                <form className="h-100" onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control bg-dark border-secondary text-secondary" id="exampleInputName" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control bg-dark border-secondary text-secondary" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text text-secondary">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control bg-dark border-secondary text-secondary" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLocation" className="form-label">location</label>
                        <input type="text" className="form-control bg-dark border-secondary text-secondary" id="exampleInputLocation" name='location' value={credentials.location} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Sign Up</button>
                    <Link className='btn btn-primary m-3 ' to={'http://localhost:3000/Login'} >Already a user / Login</Link>
                </form>
            </div>
        </>
    )
}
