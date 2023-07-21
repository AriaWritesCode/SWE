import React, { useState, useEffect } from 'react'; 
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
import BookDetails from './components/BookDetails/BookDetails';

// Create a context for global state
export const UserContext = React.createContext();


// Main App function component
function App() {
  // Declare state variables using useState
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean state to check if user is logged in
  const [user, setUser] = useState({}); // Object to hold user details
  const [cartItems, setCartItems] = useState([]); // Array to hold items in the cart
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Boolean state to check if user is logged in

  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [topSellerBooks, setTopSellerBooks] = useState([]);


  
  // Function to clear the cart
  const clearCart = () => setCartItems([]);

  useEffect(() => {
    // Fetching data from API when component mounts
    fetch("http://localhost:8080/book/getAll")
      .then(response => response.json())
      .then(data => {
        // Assuming the data received is an array and you want to split it into 
        // featuredBooks and topSellerBooks for demonstration
        // You can modify this logic based on the actual structure and requirement
        const featured = data.slice(0, data.length / 2);
        const topSellers = data.slice(data.length / 2);

        setFeaturedBooks(featured);
        setTopSellerBooks(topSellers);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Return the App component JSX
  return (
    // Use Context Provider to pass down the state and the updater function to child components
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, cartItems, setCartItems, clearCart,isAdminLoggedIn,setIsAdminLoggedIn, featuredBooks, setFeaturedBooks, topSellerBooks, setTopSellerBooks}}>
      <div className="app">
        <Router>
          <NavBar/> {/* NavBar component */}
          <h1>Bookstore</h1>
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
            <Route path="/editProfile" element={<EditProfile />} /> 
            <Route path="/return" element={<Return />} /> 
            <Route path="/orderHistory" element={<OrderHistory />} /> 
            <Route path="/book/:bookID" element={<BookDetails />} />
            {/* Add more Routes as needed */}
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
