import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import NavBar from './components/NavBar/NavBar'; 
import HomePage from './components/HomePage/HomePage'; 
import LoginPage from './components/Login/Login'; 
import RegisterPage from './components/Registration/Registration'; 
import Cart from './components/Cart/Cart'; 
import Checkout from './components/Checkout/Checkout'; 
import Payment from './components/Payment/Payment'; 
import EditProfile from './components/Profile/EditProfile'; 
import Return from './components/Return/Return'; 
import OrderHistory from './components/History/OrderHistory'; 
import AdminLoginPage from './components/Admin/AdminLoginPage';
import ManageBooks from './components/ManageBooks/ManageBooks';

// Create a context for global state
export const UserContext = React.createContext();

// Main App function component
function App() {
  // Declare state variables using useState
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean state to check if user is logged in
  const [user, setUser] = useState({}); // Object to hold user details
  const [cartItems, setCartItems] = useState([]); // Array to hold items in the cart
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Boolean state to check if user is logged in
  

  // Function to clear the cart
  const clearCart = () => setCartItems([]);

  // Return the App component JSX
  return (
    // Use Context Provider to pass down the state and the updater function to child components
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, cartItems, setCartItems, clearCart,isAdminLoggedIn,setIsAdminLoggedIn }}>
      <div className="app">
        <h1>Bookstore</h1>
        <Router>
          <NavBar/> {/* NavBar component */}
          <Routes>
            {/* Define routes for the app. When the path matches the URL, the corresponding component is rendered */}
            <Route path="/" element={<HomePage />} /> 
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/adminlogin" element={<AdminLoginPage />} />
            <Route path="/manageBooks" element={<ManageBooks />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/editProfile" element={<EditProfile />} /> {/* Add Route for EditProfile */}
            <Route path="/return" element={<Return />} /> {/* Add this line */}
            <Route path="/orderHistory" element={<OrderHistory />} /> {/* Add this line */}
            {/* Add more Routes as needed */}
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
