import React, { useContext } from 'react'
import { AlertContext } from '../contexts/alert/AlertContext';

export default function Alert(props) {
    const { alert } = useContext(AlertContext);
    const AlertUtilityFunction = (word) => {
        if (word === 'danger') {
            word = 'Error';
        }
        word = word ? word.toLowerCase() : '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return alert !== null
        &&
        (
            <>
                <div style={{ height: '50px', marginBottom: '0.5rem' }}>
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{AlertUtilityFunction(alert.type)}:</strong> {alert.msg}
                    </div>
                </div>
            </>
        )
}