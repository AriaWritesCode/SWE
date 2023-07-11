import React, { useContext, useState } from 'react'; 
import { UserContext } from '../../App'; 
import './Login.css'; 

// Login function component
function Login() {
  // Extract setIsLoggedIn from UserContext
  const { setIsLoggedIn } = useContext(UserContext);
  // Initialize state for username and password with useState hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Initialize isSubmitted state to keep track of form submission
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    if (username && password) { // If both fields are filled
      setUsername(''); // Clear the form
      setPassword('');

      // Set the submission and login to true
      setIsSubmitted(true);
      setIsLoggedIn(true);
    } 
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
    </form>
  );
}

export default Login;