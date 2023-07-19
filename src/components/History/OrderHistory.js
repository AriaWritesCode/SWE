import React, { useContext } from 'react';  
import { UserContext } from '../../App'; 
import { useNavigate } from 'react-router-dom'; 
import './OrderHistory.css';  

const orders = [
  {id: 1, date: '01-01-2023', books: [{title: 'Book 1', count: 1}, {title: 'Book 2', count: 2}]},
  {id: 2, date: '02-02-2023', books: [{title: 'Book 3', count: 1}]},
  {id: 3, date: '02-03-2023', books: [{title: 'Book 4', count: 2}]}
];

function OrderHistory() {
  // useNavigate hook for navigating 
  const navigate = useNavigate();
  // Access the global state using useContext hook
  const { setCartItems } = useContext(UserContext);

  // Function to reorder a past order
  const reorder = (order) => {
    // To be implemented: setCartItems(order.books);
    navigate('/checkout');
  }

  return (
    <div className='order-history'>
      <h2>Welcome to your Order History!</h2> 
      <hr/>   
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
            
            <button onClick={() => reorder(order)} className="reorder-button">Reorder</button>

            <hr/>  
          </div>
        ))
      }
    </div>
  );
}

export default OrderHistory;
