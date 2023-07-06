import React, { useState, useEffect, useContext } from 'react'; 
import { UserContext } from '../../App'; 
import './HomePage.css'; 

// Define featuredBooks array
const featuredBooks = [
    {
        imageUrl: 'https://m.media-amazon.com/images/I/91XUENePBlL._AC_UF1000,1000_QL80_.jpg',
        title: 'Diary of a Wimpy Kid',
        description: 'This is a brief description about Diary of a Wimpy Kid.',
        price: 10.99,
        author: 'Jeff Kinney',
    },
    {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/80/Diary_of_a_Wimpy_Kid_Rodrick_Rules_book_cover.png',
        title: 'Diary of a Wimpy Kid Rodrick Rules',
        description: 'This is a brief description about Diary of a Wimpy Kid but Rodrick Rules.',
        price: 11.99,
        author: 'Jeff Kinney',
    },
    // add more featured books here...
];

// Define topSellerBooks array
const topSellerBooks = [
    {
        imageUrl: 'https://images.booksense.com/images/866/064/9780439064866.jpg',
        title: 'Harry Potter and the Chamber of Secrets',
        description: 'This is a brief description about Harry Potter and the Chamber of Secrets.',
        price: 14.99,
        author: 'J.K. Rowling',
    },
    {
        imageUrl: 'https://images.booksense.com/images/595/139/9780439139595.jpg',
        title: 'Harry Potter and the Goblet of Fire',
        description: 'This is a brief description about Harry Potter and the Goblet of Fire.',
        price: 15.99,
        author: 'J.K. Rowling',
    },
    // add more top sellers here...
];

// HomePage function component
function HomePage() {
    // Declare state variables using useState
    const [input, setInput] = useState(''); // For search input field
    const [searchTerm, setSearchTerm] = useState(''); // For storing the search term
    const [bookDetails, setBookDetails] = useState(''); // To store and display book details
    const [cartAlert, setCartAlert] = useState(''); // To show alert when item is added to cart

    // Extract values from UserContext
    const { isLoggedIn, cartItems, setCartItems } = useContext(UserContext);

    // useEffect hook to reset search term on unmount
    useEffect(() => {
        return () => setSearchTerm('');
    }, []);

    // Function to render book component
    function renderBook(book) {
        const { imageUrl, title, description, price, author } = book; // Extract properties from book object

        // Function to show or hide book details
        const showDetails = () => setBookDetails(description === bookDetails ? '' : description);

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
                <p>By: {author}</p>  
                <p>Price: ${price}</p>
                <button onClick={showDetails} className="btn-details">View Details</button>
                <button onClick={addToCart} className="btn-addtocart">Add to Cart</button>
                {bookDetails === description && <p>{description}</p>}
            </div>
        );
    }

    // Filter books based on the search term (Right now it's Book title and author)
    const filteredFeaturedBooks = featuredBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredTopSellerBooks = topSellerBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));

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