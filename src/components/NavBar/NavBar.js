import React, { useContext } from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import { UserContext } from '../../App';  
import './NavBar.css';  

// Functional component for the navigation bar
function NavBar() {
    // Use the useNavigate hook for redirecting users
    const navigate = useNavigate();

    // Access the global state using useContext hook
    const { isLoggedIn, signOut, isAdminLoggedIn } = useContext(UserContext);

    // Handler for signing out
    const handleSignOut = () => {
        signOut();  // Clear the global state
        navigate('/');  // Redirect to home page
    };

    // Return the JSX for the navbar
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/" className="nav-link">Home</Link></li>  
                <li><Link to="/checkout" className="nav-link">Checkout</Link></li>  

                {/* If the user is not logged in, show login and register links */}
                {(!isLoggedIn) && (!isAdminLoggedIn) && (
                    <>
                        <li><Link to="/login" className="nav-link">Login</Link></li>  
                        <li><Link to="/adminlogin" className="nav-link">Admin Login</Link></li>  
                        <li><Link to="/register" className="nav-link">Register</Link></li>  
                    </>
                )}

                

                {/* If the user is logged in, show links for authenticated users */}
                {isLoggedIn && (
                    <>
                        <li><Link to="/orderHistory" className="nav-link">Order History</Link></li>  
                        <li><Link to="/return" className="nav-link">Return</Link></li>  
                        <li><Link to="/editProfile" className="nav-link">Edit Profile</Link></li>  
                        <li><Link to="/" onClick={handleSignOut} className="nav-link">Sign Out</Link></li>
                    </>
                )}

                {/* If the admin is logged in, show links for authenticated users */}
                {isAdminLoggedIn && (
                    <>
                        <li><Link to="/orderHistory" className="nav-link">Order History</Link></li>  
                        <li><Link to="/manageBooks" className="nav-link">Manage Books</Link></li>  
                        <li><Link to="/" className="nav-link">Manage Users</Link></li>  
                        <li><Link to="/" className="nav-link">Manage Promotions</Link></li>  

                        <li><Link to="/return" className="nav-link">Return</Link></li>  
                        <li><Link to="/editProfile" className="nav-link">Edit Profile</Link></li>  
                        <li><Link to="/" onClick={handleSignOut} className="nav-link">Sign Out</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
