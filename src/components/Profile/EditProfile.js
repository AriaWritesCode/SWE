import React, { useContext, useState } from 'react';  
import { UserContext } from '../../App';  
import './EditProfile.css';  
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const { isLoggedIn, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState(user.fullName);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cardInfo, setCardInfo] = useState(user.cardInfo);
    const [cvv, setCvv] = useState(user.cvv || ''); // Assuming the user object might have these fields
    const [expirationDate, setExpirationDate] = useState(user.expirationDate || '');
    const [state, setState] = useState(user.state || '');
    const [address, setAddress] = useState(user.address);

    const [error, setError] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const updatedUser = { 
            ...user, 
            fullName, 
            cardInfo, 
            cvv,
            expirationDate,
            state,
            address 
        };
        
        if (password.trim() !== '') {
            updatedUser.password = password;
        }

        fetch('http://localhost:8080/customer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.text())
        .then(message => {
            if (message.includes("Customer added")) {
                setIsSaved(true);
                setFullName('');
                setPassword('');
                setConfirmPassword('');
                setCardInfo('');
                setCvv('');
                setExpirationDate('');
                setState('');
                setAddress('');
                setError('');
            } else {
                throw new Error('Failed to save. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error updating user data:', error);
            setError(error.message || 'Failed to save. Please try again.');
        });
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
    <div className="editProfile-form">
        {isSaved ? (
            <h2>Edit Saved</h2>
        ) : (
            <>  
                <label>Full Name:
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <label>Credit Card Info:
                    <input type="text" value={cardInfo} onChange={(e) => setCardInfo(e.target.value)} />
                </label>
                <label>CVV:
                    <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </label>
                <label>Expiration Date:
                    <input type="text" placeholder="MM/YY" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                </label>
                <label>State:
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
                </label>
                <label>Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
                {error && <div className="error-message">{error}</div>}  
                <div className="button-group">
                    <button onClick={handleSave}>Save</button>
                    <div className="additional-buttons">
                        <button className="order-history-button" onClick={() => navigate("/orderHistory")}>Order History</button>
                        <button className="return-button" onClick={() => navigate("/return")}>Return</button>
                    </div>
                </div>
            </>
        )}
    </div>
    )
}

export default EditProfile;
