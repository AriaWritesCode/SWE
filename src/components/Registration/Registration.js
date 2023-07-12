import React, { useState } from 'react'; 
import './Registration.css'; 

// Registration function component
const Registration = () => {
    // Initialize states for full name, username, password, password confirmation, email, card info, address, 
    // registration status, and error message with useState hook
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [cardInfo, setCardInfo] = useState('');
    const [address, setAddress] = useState('');
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Handler for form submission
    const handleSubmit = event => {
        event.preventDefault(); // Prevent form from refreshing the page
        if (fullName && username && password && passwordConfirmation && email) { // If all required fields are filled
            if (password !== passwordConfirmation) { // If passwords do not match
                setErrorMessage('Password and confirmation do not match.');
            } else if (!/\S+@\S+\.\S+/.test(email)) { // If email is not valid
                setErrorMessage('Email address is not valid.');
            } else { // If everything is correct
                setRegistrationComplete(true); // Update registration status to complete
            }
        } else { // If any required field is not filled
            setErrorMessage('Please fill out all required fields.');
        }
    };

    // Return Registration JSX
    return (
        !registrationComplete ?
        <form className="registration-form" onSubmit={handleSubmit}>
            <label>
                Full Name*
                <input type="text" placeholder="Required Field" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </label>
            <label>
                Username*
                <input type="text" placeholder="Required Field" value={username} onChange={e => setUsername(e.target.value)} required />
            </label>
            <label>
                Password*
                <input type="password" placeholder="Required Field" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <label>
                Password Confirmation*
                <input type="password" placeholder="Required Field" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
            </label>
            <label>
                Email*
                <input type="email" placeholder="Required Field" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Card Info
                <input type="text" placeholder="Optional" value={cardInfo} onChange={e => setCardInfo(e.target.value)} />
            </label>
            <label>
                Address
                <input type="text" placeholder="Optional" value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form> :
        <h2>Registration Complete!</h2>
    );
};

export default Registration;
