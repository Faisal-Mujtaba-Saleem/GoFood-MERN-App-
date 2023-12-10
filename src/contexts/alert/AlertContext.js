import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({ msg: message, type });
        window.scrollTo({ top: 0, behaviour: "smooth" });
        setTimeout(() => {
            setAlert(null)
        }, 5000);
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}