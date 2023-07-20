import React, { useState } from 'react'; 
import './Registration.css'; 

const Registration = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [cardInfo, setCardInfo] = useState('');
    const [cvv, setCvv] = useState(''); 
    const [expirationDate, setExpirationDate] = useState('');  
    const [state, setState] = useState('');  
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true); 

        if (fullName && username && password && passwordConfirmation && email) {
            if (password !== passwordConfirmation) {
                setErrorMessage('Password and confirmation do not match.');
                setIsSubmitting(false);
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                setErrorMessage('Email address is not valid.');
                setIsSubmitting(false);
            } else {
                fetch('http://localhost:8080/customer/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullName, username, password, email, cardInfo, cvv, expirationDate, state, address, })
                })
                .then(response => {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.indexOf('application/json') !== -1) {
                        return response.json().then(data => {
                            if (data.success) {
                                clearForm();
                            } else {
                                setErrorMessage(data.message || 'Registration failed');
                                setIsSubmitting(false); 
                            }
                        });
                    } else {
                        return response.text().then(text => {
                            console.log('Unexpected response from server: ' + text);
                        });
                        setIsSubmitting(false); 
                    }
                })
                .catch(error => {
                    setErrorMessage('There has been a problem with your fetch operation: ' + error.message);
                    setIsSubmitting(false); 
                });
            }
        } else {
            setErrorMessage('Please fill out all required fields.');
            setIsSubmitting(false);
        }
    };

    if (isSubmitting) {
        return (
            <div className="registration-success-message">
                Registration Complete!
            </div>
        );
    }

    return (
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
                CVV
                <input type="text" placeholder="Optional" value={cvv} onChange={e => setCvv(e.target.value)} />
            </label>
            <label>
                Expiration Date
                <input type="text" placeholder="MM/YY" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
            </label>
            <label>
                State
                <input type="text" placeholder="Optional" value={state} onChange={e => setState(e.target.value)} />
            </label>
            <label>
                Address
                <input type="text" placeholder="Optional" value={address} onChange={e => setAddress(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
};

export default Registration;
