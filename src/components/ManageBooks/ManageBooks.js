import React, { useState } from 'react'
import './ManageBooks.css';

// Array of Book Objects
const bookList = [
  {
    id: 1,
    imageUrl: 'https://m.media-amazon.com/images/I/91XUENePBlL._AC_UF1000,1000_QL80_.jpg',
    title: 'Diary of a Wimpy Kid',
    description: 'This is a brief description about Diary of a Wimpy Kid.',
    price: 10.99,
    author: 'Jeff Kinney',
},
{
    id: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/80/Diary_of_a_Wimpy_Kid_Rodrick_Rules_book_cover.png',
    title: 'Diary of a Wimpy Kid Rodrick Rules',
    description: 'This is a brief description about Diary of a Wimpy Kid but Rodrick Rules.',
    price: 11.99,
    author: 'Jeff Kinney',
},
 {
    id: 3,
    imageUrl: 'https://images.booksense.com/images/866/064/9780439064866.jpg',
    title: 'Harry Potter and the Chamber of Secrets',
    description: 'This is a brief description about Harry Potter and the Chamber of Secrets.',
    price: 14.99,
    author: 'J.K. Rowling',
},
{
    id: 4,
    imageUrl: 'https://images.booksense.com/images/595/139/9780439139595.jpg',
    title: 'Harry Potter and the Goblet of Fire',
    description: 'This is a brief description about Harry Potter and the Goblet of Fire.',
    price: 15.99,
    author: 'J.K. Rowling',
},
]

export default function ManageBooks() {
  const [books, setBooks] = useState(bookList)
  const [newBook, setNewBook] = useState({
    imageUrl: '',
    title: '',
    description: '',
    price: '',
    author: '',
  }) // Storing details of new book

  // Event handle for input fields changes
  const handleInputChange = (event) => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value,
    })
  }

  // Event handler for adding new book
  const handleAddBook = (event) => {
    event.preventDefault()
    setBooks([
      ...books,
      {
        ...newBook,
        id: Date.now(), // Giving Unique ID to new book
      },
    ])
    setNewBook({
      imageUrl: '',
      title: '',
      description: '',
      price: '',
      author: '',
    })
  }

  // Removing Book
  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  // Getting into the book form
  return (
    <div className="book-list">
      <h2>Manage these books</h2>
      <form onSubmit={handleAddBook} className="book-form">
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          placeholder="Book title"
          value={newBook.title}
        />
        <input
          type="text"
          name="author"
          onChange={handleInputChange}
          placeholder="Author"
          value={newBook.author}
        />
        <input
          type="text"
          name="imageUrl"
          onChange={handleInputChange}
          placeholder="Image URL"
          value={newBook.imageUrl}
        />
        <input
          type="text"
          name="description"
          onChange={handleInputChange}
          placeholder="Description"
          value={newBook.description}
        />
        <input
          type="text"
          name="price"
          onChange={handleInputChange}
          placeholder="Price"
          value={newBook.price}
        />
        <button type="submit" className="btn-add">Add book</button>
      </form>
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.imageUrl} alt={book.title} />
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <h4>Author: {book.author}</h4>
          <h4>Price: ${book.price}</h4>
          <button onClick={() => handleRemoveBook(book.id)} className="btn-remove">Remove Book</button>
        </div>
      ))}
    </div>
  )
}