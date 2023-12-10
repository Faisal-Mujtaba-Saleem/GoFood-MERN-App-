import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screens/Home';
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { MyOrders } from "./screens/MyOrders";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { AlertContext } from "./contexts/alert/AlertContext";

function App() {
  const appTitle = 'GoFood';
  const appDescription = 'Your favorite food delivered to your doorstep!';
  const appLinks = [
    { label: 'Home', link: '/home' },
    { label: 'Orders', link: '/orders' },
  ];
  const email = "faisalmujtaba2005@gmail.com"
  const phone = "+92 3360245402"

  const { alert } = useContext(AlertContext);
  return (
    <>
      <Router>
        <div>
          <Navbar appTitle={appTitle} />
        </div>
        {alert && <Alert />}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/createuser" element={<SignUp />} />
          </Routes>
        </div>
        <div>
          <Footer appTitle={appTitle} appDescription={appDescription} appLinks={appLinks} email={email} phone={phone} />
        </div>
      </Router>
    </>
  );
}

export default App;
