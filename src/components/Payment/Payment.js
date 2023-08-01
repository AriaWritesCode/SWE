import React, { useContext, useState } from 'react'; 
import { UserContext } from '../../App'; 
import './Payment.css'; 
import { v4 as uuidv4 } from 'uuid';

function Payment() {
    const { isLoggedIn, cartItems, clearCart } = useContext(UserContext);
    const [cardInfo, setCardInfo] = useState(''); 
    const [address, setAddress] = useState(''); 
    const [paymentComplete, setPaymentComplete] = useState(false); 
    const [orderId, setOrderId] = useState(null);
    const [receiptItems, setReceiptItems] = useState([]);
    const [emailToSend, setEmailToSend] = useState(''); 
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleCardInfoChange = (event) => {
        setCardInfo(event.target.value); 
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value); 
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(cardInfo === '' || address === '') {
            alert('Please fill all the fields');
            return;
        }
        setReceiptItems([...cartItems]);
        setOrderId(uuidv4());
        setPaymentComplete(true);
        clearCart();
    };

    const handleEmailChange = (event) => {
        setEmailToSend(event.target.value); 
    };

    const handleEmailSubmit = (event) => {
        event.preventDefault(); 
        setSendingEmail(true);
        fetch('http://localhost:8080/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: emailToSend,
                subject: "Your Receipt",
                message: `Order ID: ${orderId}, Total: $${receiptItems.reduce((total, book) => total + parseInt(book.price), 0)}`
            })
        })
        .then(response => response.text())
        .then(data => {
            if (data === "Email Sent successfully") {
                setEmailSent(true);
            } else {
                alert("Error sending the email. Please try again.");
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        })
        .finally(() => {
            setSendingEmail(false);
        });
    };

    if (!isLoggedIn) {
        return <div>Please login first.</div>;
    }

    return (
        <div className="payment">
            {paymentComplete ? (
                <div className="payment-receipt">
                    <h2>Payment Complete</h2>
                    <hr />
                    <ul>
                        {receiptItems.map((item, index) => (
                            <li key={index} className="receipt-item">{item.title} - ${item.price}</li> 
                        ))}
                    </ul>
                    <h3>Total: ${receiptItems.reduce((total, book) => total + parseInt(book.price), 0)}</h3>
                    <hr />
                    <h4>Order ID: {orderId}</h4>

                    <div className="email-section">
                        <h4>Send this receipt to an email</h4>
                        <form onSubmit={handleEmailSubmit}>
                            <input type="email" value={emailToSend} onChange={handleEmailChange} placeholder="Enter email" required />
                            <input type="submit" value="Send" />
                        </form>
                        {sendingEmail && <p>Sending...</p>}
                        {emailSent && <p>Email Sent!</p>}
                    </div>

                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Card Info: 
                        <input type="text" placeholder="Required" value={cardInfo} onChange={handleCardInfoChange} required/>
                    </label>
                    <label>
                        Shipping Address: 
                        <input type="text" placeholder="Required" value={address} onChange={handleAddressChange} required/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            )}
        </div>
    );
}

export default Payment;
