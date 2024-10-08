// components/LoginForm.js

import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

const LoginForm = ({ setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'login', username, password }),
    });
    
    const data = await res.json();
    setMessage(data.message); // Set message from the response

    if (res.ok) {
      // Store login state in sessionStorage
      sessionStorage.setItem('isLoggedIn', true);
      sessionStorage.setItem('username', username);
      
      // Redirect to the admin page after successful login
      router.push('/admin');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
