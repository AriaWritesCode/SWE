import React from 'react';  
import './OrderHistory.css';  

// Define a constant 'orders' which is an array of order objects. Each order object contains
// an id, a date, and an array of books. Each book is an object containing a title and a count.
const orders = [
  {id: 1, date: '01-01-2023', books: [{title: 'Book 1', count: 1}, {title: 'Book 2', count: 2}]},
  {id: 2, date: '02-02-2023', books: [{title: 'Book 3', count: 1}]}
];

function OrderHistory() {
  return (
    // We start by returning a div with a class of 'order-history'.
    <div className='order-history'>
      <h2>Welcome to your Order History!</h2> 
      <hr/>   
      
     .
      {
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order ID: {order.id}</h3> 
            <p>Date: {order.date}</p> 
            <h4>Books:</h4> 
            
            <ul>
              {
                order.books.map((book, index) => (
                  <li key={index}>{book.title} (Quantity: {book.count})</li> 
                ))
              }
            </ul>
            
            <hr/>  
          </div>
        ))
      }
    </div>
  );
}

export default OrderHistory;  
