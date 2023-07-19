import React, { useContext, useState } from 'react';  
import { UserContext } from '../../App';  
import './EditProfile.css';  
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const { isLoggedIn, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Match the state variable names with the database object keys
    const [fullName, setFullName] = useState(user.fullName);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [cardInfo, setCardInfo] = useState(user.cardInfo);
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
            address 
        };
        
        if (password.trim() !== '') {
            updatedUser.password = password;
        }

        // Directly send the updated user to the /register endpoint.
        fetch('http://localhost:8080/customer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.text()) // assuming response sends back a plain text message
        .then(message => {
            if (message.includes("Customer added")) { // Check the response message to verify the success.
                setIsSaved(true);
                setFullName('');
                setPassword('');
                setConfirmPassword('');
                setCardInfo('');
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
                {error && <div className="error-message">{error}</div>}  
                <label>Credit Card Info:
                    <input type="text" value={cardInfo} onChange={(e) => setCardInfo(e.target.value)} />
                </label>
                <label>Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </label>
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
