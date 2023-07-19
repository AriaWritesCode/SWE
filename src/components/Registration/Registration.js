import React, { useState } from 'react'; 
import './Registration.css'; 

const Registration = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [cardInfo, setCardInfo] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const clearForm = () => {
        setFullName('');
        setUsername('');
        setPassword('');
        setPasswordConfirmation('');
        setEmail('');
        setCardInfo('');
        setAddress('');
        setErrorMessage(null);
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (fullName && username && password && passwordConfirmation && email) {
            if (password !== passwordConfirmation) {
                setErrorMessage('Password and confirmation do not match.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                setErrorMessage('Email address is not valid.');
            } else {
                fetch('http://localhost:8080/customer/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullName, username, password, email, cardInfo, address })
                })
                .then(response => {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json().then(data => {
                            if (data.success) {
                                setRegistrationComplete(true);
                                clearForm();
                            } else {
                                setErrorMessage(data.message || 'Registration failed');
                            }
                        });
                    } else {
                        return response.text().then(text => {
                            console.log('Unexpected response from server: ' + text);
                        });
                    }
                })
                .catch(error => {
                    setErrorMessage('There has been a problem with your fetch operation: ' + error.message);
                });
            }
        } else {
            setErrorMessage('Please fill out all required fields.');
        }
    };

    return (
        registrationComplete ? (
            <div className="registration-success-message">
                Registration Complete!
            </div>
        ) : (
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
            </form>
        )
    );
};

export default Registration;
