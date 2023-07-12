import React, { useContext, useState } from 'react';  
import { UserContext } from '../../App';  
import './EditProfile.css';  
import { useNavigate } from 'react-router-dom';

// Functional component for the EditProfile page
function EditProfile() {
    // Access the global state using useContext hook
    const { isLoggedIn, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();  // Get the navigate function

    // Declare local state variables for form inputs
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [creditCard, setCreditCard] = useState(user.creditCard);
    const [address, setAddress] = useState(user.address);

    // State variables for form feedback
    const [error, setError] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        // Validate password confirmation
        if (password !== confirmPassword) {
            setError("Passwords do not match");  // Set error message
        } else {
            // Create a new user object with the updated data
            const updatedUser = {...user, name, creditCard, address};

            // If the password field is not empty, update the password
            if (password !== '') {
                updatedUser.password = password;
            }

            // Update the global state with the new user data
            setUser(updatedUser);

            // Clear the form fields
            updatedUser.name = '';
            updatedUser.creditCard = '';
            updatedUser.address = '';
            setName('');
            setPassword('');
            setConfirmPassword('');
            setCreditCard('');
            setAddress('');
            setError('');
            setIsSaved(true);  // Set the saved state to true
        }
    }

    // If the user is not logged in, don't render anything
    if (!isLoggedIn) {
        return null;
    }

    // Return the JSX for the form
    return (
    <div className="editProfile-form">
        {isSaved ? (
            <h2>Edit Saved</h2>
        ) : (
            <>  
                <label>Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                {error && <div className="error-message">{error}</div>}  
                <label>Credit Card:
                    <input type="text" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
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
