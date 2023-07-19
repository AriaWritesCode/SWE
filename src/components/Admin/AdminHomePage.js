import React, { useState, useEffect, useContext } from 'react'; 
import { UserContext } from '../../App'; 
import './HomePage.css'; 



// HomePage function component
function HomePage() {
    // Declare state variables using useState
    const [input, setInput] = useState(''); // For search input field
    const [searchTerm, setSearchTerm] = useState(''); // For storing the search term
    const [bookDetails] = useState(''); // To store and display book details
    const [cartAlert, setCartAlert] = useState(''); // To show alert when item is added to cart

    // Extract values from UserContext
    const { isLoggedIn, cartItems, setCartItems, featuredBooks, topSellerBooks  } = useContext(UserContext);
    
    // Use useHistory hook here
    const navigate = useNavigate();

    // Function to render book component
    function renderBook(book) {
        const { id, imageUrl, title, description, price, author } = book; // Extract properties from book object

        const showDetails = () => {
            // Redirect to the book details page
            navigate(`/book/${id}`); // We are now using id instead of title
        };


        // Function to add a book to cart
        const addToCart = () => {
            if (!isLoggedIn) {
                alert('Please login first');
                return;
            }
            setCartItems([...cartItems, book]); // Add book to cartItems array
            setCartAlert(`${book.title} has been added to the cart!`); // Show the alert

            // Remove the alert after 3 seconds
            setTimeout(() => {
                setCartAlert('');
            }, 3000);
        };

        // Return JSX for individual book
        return (
            <div className="book">
                <img src={imageUrl} alt="Book" className="bookImage" />
                <p>{title}</p>
                <p>Price: ${price}</p>
                <button onClick={showDetails} className="btn-details">View Details</button>
                <button onClick={addToCart} className="btn-addtocart">Add to Cart</button>
                {bookDetails === description && <p>{description}</p>}
            </div>
        );
    }

        const filteredFeaturedBooks = featuredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.isbn.toString().includes(searchTerm)
    );

    const filteredTopSellerBooks = topSellerBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.isbn.toString().includes(searchTerm)
    );

    // Handle search function
    const handleSearch = () => setSearchTerm(input);

    // Return HomePage JSX
    return (
        <div className="homePage">
            <input
                type="text"
                placeholder="Search for a book"
                onChange={(event) => setInput(event.target.value)}
            />
            <button onClick={handleSearch} className='searchButton'>Search</button>

            {cartAlert && <div className="cart-alert">{cartAlert}</div>}

            <h2>Featured Books</h2>
            <div className="books">
                {filteredFeaturedBooks.map(renderBook)}
            </div>

            <h2>Top Sellers</h2>
            <div className="books">
                {filteredTopSellerBooks.map(renderBook)}
            </div>
        </div>
    );
}

export default HomePage;