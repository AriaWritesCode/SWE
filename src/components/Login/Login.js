import React, { useContext, useState } from 'react'; 
import { UserContext } from '../../App'; 
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

// Login function component
function Login() {
  // Extract setIsLoggedIn from UserContext
  // Initialize state for username and password with useState hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Initialize isSubmitted state to keep track of form submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate(); // Add useNavigate hook
  const { setIsLoggedIn, setUser } = useContext(UserContext);



  const handleSubmit = (event) => {
          event.preventDefault(); 

          fetch('http://localhost:8080/customer/getAllCustomers')
          .then(response => response.json())
          .then(data => {
              const user = data.find(user => user.username === username && user.password === password);
              if (user) {
                  setIsLoggedIn(true);
                  setUser(user);
                  navigate('/');  // Redirect to HomePage
              } else {
                  alert('Login failed. Please try again.');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('Login failed. Please try again.');
          });
      };


  // Handler for Admin Login button
  const handleAdminLogin = () => {
    navigate('/adminlogin'); // Redirect to AdminLoginPage
  };

  // If the form is submitted successfully, display a message
  if (isSubmitted) {
    return <h2>Login Complete</h2>;
  }

  // Return Login JSX
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username*
        <input
          type="text"
          placeholder="Required Field"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
      </label>

      <label>
        Password*
        <input
          type="password"
          placeholder="Required Field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
      </label>

      <button type="submit">Submit</button>
      <button onClick={handleAdminLogin}>Admin Login</button> 
    </form>
  );
}

export default Login;
