import React, { useState, useContext } from 'react';  
import { UserContext } from '../../App'; 
import { v4 as uuidv4 } from 'uuid';  
import './Return.css';  

// Functional component for the Return page
function Return() {
    // Access the global state using useContext hook
    const { isLoggedIn } = useContext(UserContext);

    // Declare local state variables for the order ID and return confirmation
    const [orderId, setOrderId] = useState('');
    const [returnComplete, setReturnComplete] = useState(false);
    const [returnConfirmation, setReturnConfirmation] = useState(null);

    // Handler for changing the order ID
    const handleOrderIdChange = (event) => {
        setOrderId(event.target.value);
    };

    // Handler for submitting the return
    const handleSubmit = (event) => {
        event.preventDefault();
        // Validation for order ID
        if (orderId === '') {
            alert('Please fill all the fields');
            return;
        }
        // Set the return confirmation ID using the uuid library
        setReturnConfirmation(uuidv4());
        // Mark the return as complete
        setReturnComplete(true);
    };

    // If the user is not logged in, prompt them to login
    if (!isLoggedIn) {
        return <div>Please login first.</div>;
    }

    // Return the JSX for the return form or return confirmation
    return (
        <div className="returnOrder">
            {returnComplete ? (
                <div className="return-receipt">
                    <h2>Return Complete</h2>  
                    <hr />
                    <h4>Return Confirmation: {returnConfirmation}</h4>  
                </div>
            ) : (
                <form onSubmit={handleSubmit}>  
                    <label>
                        Enter your Order ID: 
                        <input type="text" placeholder="Required" value={orderId} onChange={handleOrderIdChange} required/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            )}
        </div>
    );
}

export default Return;
