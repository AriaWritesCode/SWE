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

        fetch('http://localhost:8080/customer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, username, password, email, cardInfo, cvv, expirationDate, state, address })
        })
        .then(response => response.text()) 
        .then(data => {
            if (data === "success" || data === "Customer added to database") {
                return fetch('http://localhost:8080/customer/getAllCustomers')
            } else {
                throw new Error(data);
            }
        })
        .then(response => response.json())
        .then(customers => {
            const userExists = customers.some(customer => customer.email === email);
            if (userExists) {
                return fetch('http://localhost:8080/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        to: email,
                        subject: "Registration",
                        message: "Registration Complete"
                    })
                });
            } else {
                throw new Error('User not found after registration');
            }
        })
        .then(emailResponse => emailResponse.text())
        .then(emailData => {
            if (emailData !== "Email Sent successfully") {
                console.error("Error sending confirmation email: " + emailData);
            }
        })
        .catch(error => {
            setErrorMessage('There has been a problem: ' + error.message);
        })
        .finally(() => {
            clearForm();
            setIsSubmitting(true); 
        });
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
