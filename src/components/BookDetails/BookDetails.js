import React, { useState, useEffect } from 'react';
import './BookDetails.css';
import { useParams } from 'react-router-dom'; 

function BookDetails() {
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Extract bookID from the URL using useParams
    const { bookID } = useParams();

    useEffect(() => {
        fetch("http://localhost:8080/book/getAll")
            .then(response => response.json())
            .then(data => {
                setAllBooks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching book details. Please try again.</div>;

    // Find the specific book using the bookID
    const book = allBooks.find(b => b.bookID.toString() === bookID);

    if (!book) return <div>Book not found!</div>; // If book is not found

    // Render the specific book details
    return (
        <div className="book-details">
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">Author: {book.author}</h3>
            <p className="book-price">${book.price}</p>
            <p className="book-isbn">ISBN: {book.isbn}</p>
            <p className="book-summary">{book.summary}</p>
        </div>
    );
}

export default BookDetails;
