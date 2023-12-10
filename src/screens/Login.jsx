import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../contexts/alert/AlertContext';

export default function Login() {
    const { showAlert } = useContext(AlertContext)

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = credentials;

        let response = await fetch('http://localhost:5000/api/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        response = await response.json();
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

                showAlert("Hello there, food lover! You've successfully logged in to GoFood. What's on your menu today?", "success");
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
                    <h1>Login to explore delicious delights on GoFood!</h1>
                </div>
                <form className="h-100" onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control bg-dark border-secondary text-secondary" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text text-secondary">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control bg-dark border-secondary text-secondary" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Login</button>
                    <Link className='btn btn-primary m-3 ' to={'http://localhost:3000/createuser'} >Create an Account / Sign Up</Link>
                </form>
            </div>
        </>
    )
}
