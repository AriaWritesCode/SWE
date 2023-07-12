import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './BookDetails.css';

function BookDetails() {
    // Use UserContext to access the books
    const { featuredBooks, topSellerBooks } = useContext(UserContext);

    // Use useParams to get book id from url
    const { id } = useParams();

    // Combine both arrays and find the book with the matching id
    const book = [...featuredBooks, ...topSellerBooks].find(book => book.id === Number(id));

    // Return JSX to display book details
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
