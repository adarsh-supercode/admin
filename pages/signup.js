// pages/signup.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      router.push('/admin');
    }
  }, [router]);

  const onSignupSuccess = () => {
    setMessage('Signup successful! Redirecting to login page.');
    // Optionally, you can redirect to the login page here or handle it in SignupForm
    router.push('/login'); // Redirect to the login page after signup
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm onSignupSuccess={onSignupSuccess} setMessage={setMessage} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
