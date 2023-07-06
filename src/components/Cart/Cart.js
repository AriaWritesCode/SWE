import React, { useContext } from 'react'; 
import { UserContext } from '../../App'; 
import './Cart.css'; 

// Cart function component
function Cart() {
    // Extract values from UserContext
    const { cartItems } = useContext(UserContext);

    // Return Cart JSX
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 
                ? <p>Your cart is empty.</p> // If cart is empty, display this message
                : (
                    // If there are items in the cart, display each book
                    cartItems.map((book, index) => (
                        <div key={index} className="cart-item">
                            <img src={book.imageUrl} alt="Book" className="bookImage" /> 
                            <p>{book.title}</p> 
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default Cart;
