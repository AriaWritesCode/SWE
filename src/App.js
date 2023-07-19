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

  // Function to clear the cart
  const clearCart = () => setCartItems([]);

  const [featuredBooks, setFeaturedBooks] = useState([
    {
      id: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/91XUENePBlL._AC_UF1000,1000_QL80_.jpg',
      title: 'Diary of a Wimpy Kid',
      price: 10.99,
      author: 'Jeff Kinney',
      summary: 'Diary of a Wimpy Kid is a series of fiction books written by the American author and cartoonist Jeff Kinney. All the main books are the journals of the main character, Greg Heffley. However this is the first book in the series.',
      isbn: 9781419741852
    },
    {
      id: 3,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/80/Diary_of_a_Wimpy_Kid_Rodrick_Rules_book_cover.png',
      title: 'Diary of a Wimpy Kid Rodrick Rules',
      price: 14.99,
      author: 'Jeff Kinney',
      summary: 'Diary of a Wimpy Kid is a series of fiction books written by the American author and cartoonist Jeff Kinney. All the main books are the journals of the main character, Greg Heffley. However, this is the second book in the series',
      isbn: 9781419741869
    },
    
    // add more featured books here...
  ]);

  const [topSellerBooks, setTopSellerBooks] = useState([
    {
      id: 2,
      imageUrl: 'https://images.booksense.com/images/866/064/9780439064866.jpg',
      title: 'Harry Potter and the Chamber of Secrets',
      price: 14.99,
      author: 'J.K. Rowling',
      summary: 'Harry Potter and the Chamber of Secrets is a fantasy novel written by British author J. K. Rowling and the second novel in the Harry Potter series.',
      isbn: 9781338878936
    },
    {
      id: 4,
      imageUrl: 'https://images.booksense.com/images/595/139/9780439139595.jpg',
      title: 'Harry Potter and the Goblet of Fire',
      price: 15.99,
      author: 'J.K. Rowling',
      summary: 'Harry Potter and the Goblet of Fire is a fantasy novel written by British author J. K. Rowling and the fourth novel in the Harry Potter series.',
      isbn: 9780439139601
    },
    // add more top sellers here...
  ]);

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
            <Route path="/book/:id" element={<BookDetails />} /> 
            {/* Add more Routes as needed */}
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
