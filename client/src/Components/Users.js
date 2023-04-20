import { useEffect, useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './form.css';


export default function Users({isActive}) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('login');


  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('/api/Users');
        const jsonData = await res.json();
        if (!res.ok) {
          throw new Error(`error ${res.status}`);
        } else {
          setUsers(jsonData);
        }
      } catch (err) {
        setError(err);
      }
    }
    getUsers();
  }, []);


  async function addUsers(newUser) {
    try {
      const res = await fetch('/api/Users/sign-up', {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      const jsonData = await res.json();
      if (jsonData.message) {
        setMessage(jsonData.message);
      } else {
        setUsers(prev => users.concat(jsonData));
        setMessage('Registration successful');
      }
    } catch (err) {
      setError(err)
    }
  }

  async function verifyUser(user) {
    try {
      const res = await fetch('/api/Users/sign-in', {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      const jsonData = await res.json();
      localStorage.setItem('token', jsonData.token);
      localStorage.setItem('username', jsonData.payload.userName);
      if (jsonData.message) {
        setMessage('Login successful');
      }
      setTimeout(window.location.reload(), 3000);
    } catch (err) {
      setError(err)
    }
  }

if (status === 'Signup' && isActive === true) {
  return (
    <div className="Signup-Form">
      <SignUpForm statusMessage={message} onSubmit={addUsers} />
      <button onClick={() => setStatus('login')}> Go to login </button>
    </div>
  );
} else if (status === 'login' && isActive === true) {
    return (
      <div className="Signin-Form">
        <SignInForm statusMessage={message} onSubmit={verifyUser} />
        <p> Don't have an account?</p>
        <button onClick={() => setStatus('Signup')}> Register </button>
      </div>
    );
  }
}
