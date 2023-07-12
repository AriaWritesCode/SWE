import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './ManageBooks.css';

function ManageBooks() {
    const {featuredBooks, topSellerBooks, setFeaturedBooks, setTopSellerBooks} = useContext(UserContext);
    const [newBook, setNewBook] = useState({
        id: '',
        imageUrl: '',
        title: '',
        price: '',
        author: '',
        summary: '',
        isbn: '',
        isFeatured: true
    });

    const handleInputChange = e => {
        setNewBook({...newBook, [e.target.name]: e.target.value});
    };

    const handleRadioChange = e => {
        setNewBook({...newBook, isFeatured: e.target.value === "featured"});
    };


    const generateBookId = () => {
    // Combine featuredBooks and topSellerBooks into one array
    const allBooks = [...featuredBooks, ...topSellerBooks];

    // Get the highest existing book id
    const maxId = allBooks.reduce((maxId, book) => Math.max(book.id, maxId), 0);

    // Return the next available id
    return maxId + 1;
    };


    const handleAddBook = e => {
        e.preventDefault();
        // Generate a unique id for the book
        newBook.id = generateBookId();
        if (newBook.isFeatured) {
            setFeaturedBooks([...featuredBooks, newBook]);
        } else {
            setTopSellerBooks([...topSellerBooks, newBook]);
        }
        // clear form
        setNewBook({
            id: '',
            imageUrl: '',
            title: '',
            price: '',
            author: '',
            summary: '',
            isbn: '',
            isFeatured: true
        });
    };


    const handleRemoveBook = id => {
        // Filter out the book with the given id
        setFeaturedBooks(featuredBooks.filter(book => book.id !== id));
        setTopSellerBooks(topSellerBooks.filter(book => book.id !== id));
    };

    return (
        <div className="manage-books">
            <h2>Manage Books</h2>
            <form className="book-form" onSubmit={handleAddBook}>
                <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleInputChange} value={newBook.imageUrl} required />
                <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={newBook.title} required />
                <input type="text" name="price" placeholder="Price" onChange={handleInputChange} value={newBook.price} required />
                <input type="text" name="author" placeholder="Author" onChange={handleInputChange} value={newBook.author} required />
                <input type="text" name="summary" placeholder="Summary" onChange={handleInputChange} value={newBook.summary} required />
                <input type="text" name="isbn" placeholder="ISBN" onChange={handleInputChange} value={newBook.isbn} required />
                <div>
                    <label>
                        <input type="radio" name="isFeatured" value="featured" checked={newBook.isFeatured} onChange={handleRadioChange} />
                        Featured Book
                    </label>
                    <label>
                        <input type="radio" name="isFeatured" value="topSeller" checked={!newBook.isFeatured} onChange={handleRadioChange} />
                        Top Seller Book
                    </label>
                </div>
                <button type="submit">Add Book</button>
            </form>
            <div className="book-list">
                {[...featuredBooks, ...topSellerBooks].map(book => (
                    <div key={book.id} className="book-item">
                        <img src={book.imageUrl} alt={book.title}/>
                        <h3>{book.title}</h3>
                        <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageBooks;
