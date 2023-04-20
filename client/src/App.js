import './App.css';
import Users from './Components/Users';
import { useState, useEffect } from 'react';
import './Components/form.css';




function App() {
  const [user, setUser] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('username')
    if (!token !== null && user !== null) {
      setUser(user);
      setIsAuthorized(true);
      console.log('hello');
    }
  }, []);

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthorized(false);
  }

  function showLogin() {
    setStatus(!status);
  }

if (isAuthorized === false) {
  return (
    <>
      <img className='button' src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
        <button onClick={showLogin}> Login </button>
        <Users isActive={status}/>
    </>
  );
} else {
  return (
    <>
      <img className='button' src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Menu button" />
      <button onClick={handleSignOut}> Logout </button>
    </>
  )
  }
}


export default App;
